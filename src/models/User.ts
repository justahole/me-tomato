import { Sequelize, Model, STRING, ENUM, UUID, UUIDV4 } from 'sequelize'

class User extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: UUID,
          primaryKey: true,
          defaultValue: UUIDV4,
        },
        nick_name: {
          type: STRING,
          unique: true,
        },
        sex: {
          type: ENUM('man', 'woman', 'secrecy'),
          defaultValue: 'secrecy',
        },
      },
      {
        sequelize: sequelize,
        modelName: 'user',
      }
    )
  }
}

export default User
