import { Sequelize } from 'sequelize'

import UserModel from '@models/User'
import AuthModel from '@models/Auth'
import SaltModel from '@models/Salt'
import TodoModel from '@models/Todo'
import UserUsnModel from '@models/UserUsn'
import TodoUsnModel from '@models/TodoUsn'

export default async (
  sequelize: Sequelize
): Promise<{ [name: string]: Function }> => {
  const models = {
    UserModel: UserModel,
    AuthModel: AuthModel,
    SaltModel: SaltModel,
    TodoModel: TodoModel,
    UserUsnModel: UserUsnModel,
    TodoUsnModel: TodoUsnModel,
  }

  Object.entries(models).forEach(([, model]) => {
    model.injectSequelize(sequelize)
  })

  UserModel.hasMany(AuthModel, { foreignKey: 'user_id' })
  UserModel.hasMany(SaltModel, { foreignKey: 'user_id' })
  UserModel.hasMany(TodoModel, { foreignKey: 'user_id' })
  UserModel.hasOne(UserUsnModel, { foreignKey: 'user_id' })
  UserModel.hasMany(TodoUsnModel, { foreignKey: 'user_id' })

  // await sequelize.sync({ force: true })
  await sequelize.sync()

  return models
}
