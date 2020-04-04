import { Model, Sequelize, STRING } from 'sequelize'

export default class Salt extends Model {
  static injectSequelize(sequelize: Sequelize): void {
    this.init({
      salt: {
        type: STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelize,
      modelName: 'salt'
    })
  }
}
