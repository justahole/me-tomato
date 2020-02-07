import {Model, Sequelize, STRING} from 'sequelize';

/**
 * User Password salt
 */
class Salt extends Model {
  /**
   * @param {object} sequelize
   * @return {object}
   */
  static injectSequelize(sequelize: Sequelize) {
    this.init({
      salt: {
        type: STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelize,
      modelName: 'salt',
    });

    return this;
  }
}

export default Salt;
