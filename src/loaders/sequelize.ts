import {Sequelize} from 'sequelize';
import config from '../config';

export default async () => {
  const sequelize = new Sequelize(
      config.database.name,
      config.database.user,
      config.database.password,
      {
        host: config.database.host,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      },
  );

  return sequelize.authenticate();
};
