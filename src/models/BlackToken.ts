import {Model, Sequelize, STRING} from 'sequelize';

class BlackToken extends Model {
  static injectSequelize(sequelize: Sequelize) {
    this.init({
      token: {
        type: STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelize,
      modelName: 'blackToken',
    });

    return this;
  }
}

export default BlackToken;
