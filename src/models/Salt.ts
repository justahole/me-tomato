import { Model, Sequelize, STRING, UUID, UUIDV4 } from 'sequelize'

export default class Salt extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: UUID,
          primaryKey: true,
          defaultValue: UUIDV4,
        },
        salt: {
          type: STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelize,
        modelName: 'salt',
      }
    )
  }
}
