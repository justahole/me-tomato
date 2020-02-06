import {Sequelize, Model, STRING, ENUM} from 'sequelize';

/**
 * User profile Models
 */
class User extends Model {
  /**
   * defined User Model
   *
   * @param {Sequelize} sequelize
   * @return {SequelizeModel}
   */
  static injectSequelize(sequelize: Sequelize) {
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
    });

    return this;
  }
}

export default User;
