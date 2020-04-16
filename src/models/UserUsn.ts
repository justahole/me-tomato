import { Sequelize, Model, INTEGER } from 'sequelize'

export default class extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init(
      {
        usn: {
          type: INTEGER,
        },
      },
      {
        sequelize: sequelize,
        modelName: 'user_usn',
      }
    )
  }
}
