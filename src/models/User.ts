import { Sequelize, UUID, Model, STRING, ENUM } from 'sequelize';

export default class User extends Model {
  static injectSequelize(sequelize: Sequelize) {
    this.init({
      nick_name: {
        type: STRING,
        unique: true
      },
      sex: {
        type: ENUM('man', 'woman', 'secrecy'),
        defaultValue: 'secrecy',
      }
    }, {
      sequelize: sequelize,
      modelName: 'user'
    })

    return this
  }
}
