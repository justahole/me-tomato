import { Model, Sequelize, INTEGER, STRING } from 'sequelize'

export default class Auth extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      auth_type: {
        type: STRING,
        allowNull: false,
        defaultValue: 'mail',
        unique: 'compositeIndex'
      },
      auth_id: {
        type: STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      auth_access_token: {
        type: STRING,
        allowNull: false,
      },
      auth_expires: {
        type: INTEGER,
      }
    }, {
      sequelize: sequelize,
      modelName: 'auth',
    })
  }
}
