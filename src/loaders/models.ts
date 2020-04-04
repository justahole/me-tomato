import { Sequelize } from 'sequelize'

import UserModel from '../models/User'
import AuthModel from '../models/Auth'
import SaltModel from '../models/Salt'
import TodoModel from '../models/Todo'

export default async (sequelize: Sequelize): Promise<{[name: string]: object}> => {

  const models = {
    UserModel: UserModel,
    AuthModel: AuthModel,
    SaltModel: SaltModel,
    TodoModel: TodoModel,
  }
  
  Object.entries(models).forEach(([, model]) => {
    model.injectSequelize(sequelize)
  })

  UserModel.hasMany(AuthModel, { foreignKey: 'user_id' })
  UserModel.hasMany(SaltModel, { foreignKey: 'user_id' })
  UserModel.hasMany(TodoModel, { foreignKey: 'user_id' })

  await sequelize.sync()

  return models
}
