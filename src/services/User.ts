import {Service as service, Inject as inject} from 'typedi'
import {Sequelize} from 'sequelize'
import {randomBytes} from 'crypto'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import config from '../config'

/**
 * All user logic service
 */
@service()
class UserService {
  /**
   * @TODO find a way to import UserModel interface
   */
  constructor(
    @inject('UserModel') private UserModel: any,
    @inject('AuthModel') private AuthModel: any,
    @inject('SaltModel') private SaltModel: any,
    @inject('sequelize') private sequelize: Sequelize,
  ) { }

  /**
   * @param {string} param.email - user email
   */
  async signUp({email, password}) {
    const salt = randomBytes(32)
    const newUser = await this.sequelize.transaction(async (transaction) => {
      const unNamedUser = await this.UserModel.create({}, {transaction})

      await this.SaltModel.create({
        user_id: unNamedUser.id,
        salt: salt.toString('hex'),
      }, {transaction})

      const hashedPassword = await argon2.hash(password, {salt})

      await this.AuthModel.create({
        user_id: unNamedUser.id,
        auth_type: 'mail',
        auth_id: email,
        auth_access_token: hashedPassword,
      }, {transaction})

      return unNamedUser
    })

    return {
      user: newUser,
      token: this.generateToken(newUser),
    }
  }

  /**
   * User SignIn with email and password
   */
  async signIn({email, password}) {
    const auth = await this.AuthModel.findOne({
      where: {
        auth_type: 'mail',
        auth_id: email,
        auth_access_token: password,
      },
    })

    if (!auth) {
      throw new Error('Mail or password error')
    }

    const user = await this.UserModel.findByPk(auth.user_id)

    return {
      user: user,
      token: this.generateToken(user),
    }
  }

  /**
   * @param {string} email
   * @return {string}
   */
  async getSalt(email) {
    const auth = await this.AuthModel.findOne({
      where: {
        auth_type: 'mail',
        auth_id: email,
      },
    })

    if (!auth) {
      throw Error('This email has not been sign up')
    }

    const salt = await this.SaltModel.findOne({
      where: {user_id: auth.user_id},
    })

    if (salt) {
      return salt.salt
    }
  }

  /**
   * @param {object} user - user model instance
   * @return {string} token
   */
  generateToken(user) {
    const exp = Date.now() + 1000 * 60 * 60 * 24

    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp,
      },
      config.app.jwtSecret,
    )
  }
}

export default UserService
