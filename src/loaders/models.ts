import {Sequelize} from 'sequelize'

import UserModel from '../models/User'
import AuthModel from '../models/Auth'
import SaltModel from '../models/Salt'

export default async (sequelize: Sequelize) => {
  UserModel.injectSequelize(sequelize)
  AuthModel.injectSequelize(sequelize)
  SaltModel.injectSequelize(sequelize)

  UserModel.hasMany(AuthModel, {foreignKey: 'user_id'})
  UserModel.hasMany(SaltModel, {foreignKey: 'user_id'})

  await sequelize.sync()

  return {
    UserModel,
    AuthModel,
    SaltModel,
  }
}

