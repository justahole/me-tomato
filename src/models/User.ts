import { Sequelize, Model, STRING, ENUM } from 'sequelize'

class User extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
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
