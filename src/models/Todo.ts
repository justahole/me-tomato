import { Sequelize, Model, STRING, BOOLEAN, DATE } from 'sequelize'

export default class Todo extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init({
      name: {
        type: STRING,
      },
      complete: {
        type: BOOLEAN,
        defaultValue: false,
      },
      pin: {
        type: BOOLEAN,
        defaultValue: false,
      },
      completed_at: {
        type: DATE,
      }
    }, {
      sequelize: sequelize,
      modelName: 'todo',
    })
  }
}
