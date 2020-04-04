import { Sequelize, Model, STRING, ENUM } from 'sequelize'

class User extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init({
      nick_name: {
        type: STRING,
        unique: true,
      },
      sex: {
        type: ENUM('man', 'woman', 'secrecy'),
        defaultValue: 'secrecy',
      },
    }, {
      sequelize: sequelize,
      modelName: 'user',
    })
  }
}

export default User
