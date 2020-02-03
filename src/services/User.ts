import 'reflect-metadata';
import {Service as service, Inject} from 'typedi';
import {Sequelize} from 'sequelize';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import config from '../config'

@service()
export default class UserService {
  /**
   * @TODO find a way to import UserModel interface
   */
  constructor(
    @Inject('UserModel') private UserModel: any,
    @Inject('AuthModel') private AuthModel: any,
    @Inject('SaltModel') private SaltModel: any,
    @Inject('sequelize') private sequelize: Sequelize,
  ) { }

  async signUp({email, password}) {

    const salt = randomBytes(32)
    const newUser = await this.sequelize.transaction(async transaction => {
      const unNamedUser = await this.UserModel.create({}, {transaction})
      await this.SaltModel.create({
        user_id: unNamedUser.id,
        salt: salt.toString('hex')
      }, { transaction })

      const hashedPassword = await argon2.hash(password, { salt })
      await this.AuthModel.create({
        user_id: unNamedUser.id,
        auth_type: 'mail',
        auth_id: email,
        auth_access_token: hashedPassword
      }, { transaction })

      return unNamedUser
    })

    return this.generateToken(newUser)
  }

  /**
   * 
   * @param user - user model instance
   * @returns token {jwt}
   */
  generateToken(user) {
    const exp = Date.now() + 1000 * 60 * 60 * 24;

    return jwt.sign(
      {
        _id: user.id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp,
      },
      config.app.jwtSecret,
    );
  }
}
