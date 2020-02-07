import {Sequelize} from 'sequelize';

import UserModel from '../models/User';
import AuthModel from '../models/Auth';
import SaltModel from '../models/Salt';
import BlackTokenModel from '../models/BlackToken';

/**
 * This loader use for connect models and associate them
 * @param {Sequelize} sequelize
 */
export default async (sequelize: Sequelize) => {
  UserModel.injectSequelize(sequelize);
  AuthModel.injectSequelize(sequelize);
  SaltModel.injectSequelize(sequelize);
  BlackTokenModel.injectSequelize(sequelize);

  UserModel.hasMany(AuthModel, {foreignKey: 'user_id'});
  UserModel.hasMany(SaltModel, {foreignKey: 'user_id'});

  await sequelize.sync();

  /**
   * @TODO blackToken release loop
   */

  return {
    UserModel,
    AuthModel,
    SaltModel,
    BlackTokenModel,
  };
}
;
