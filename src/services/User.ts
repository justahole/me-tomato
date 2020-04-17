import { Service as service, Inject as inject } from 'typedi'
import { Sequelize } from 'sequelize'
import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import { Config } from '@root/interfaces/config'

/**
 * All user logic service
 */
@service()
class UserService {
  constructor(
    @inject('UserModel') private UserModel,
    @inject('AuthModel') private AuthModel,
    @inject('SaltModel') private SaltModel,
    @inject('UserUsnModel') private UserUsnModel,
    @inject('sequelize') private sequelize: Sequelize,
    @inject('config') private config: Config
  ) {}

  /**
   * @param {string} param.email - user email
   */
  async signUp({ email, password }) {
    const salt = randomBytes(32)
    const newUser = await this.sequelize.transaction(async (transaction) => {
      const user = await this.UserModel.create({}, { transaction })

      await this.SaltModel.create(
        {
          user_id: user.id,
          salt: salt.toString('hex'),
        },
        { transaction }
      )

      await this.UserUsnModel.create(
        { user_id: user.id, usn: 0 },
        { transaction }
      )

      const hashedPassword = await argon2.hash(password, { salt })

      await this.AuthModel.create(
        {
          user_id: user.id,
          auth_type: 'mail',
          auth_id: email,
          auth_access_token: hashedPassword,
        },
        { transaction }
      )

      return user
    })

    return {
      user: newUser,
      token: this.generateToken(newUser),
    }
  }

  /**
   * User SignIn with email and password
   */
  async signIn({ email, password }) {
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
      where: { user_id: auth.user_id },
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
    /**
     * exp is one day
     */
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24

    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        exp: exp,
      },
      this.config.app.jwtSecret
    )
  }
}

export default UserService
