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
          max: config.database.pool.max,
          min: config.database.pool.min,
          acquire: config.database.pool.acquire,
          idle: config.database.pool.idle,
        },
        define: { 
          underscored: true
        }
      },
  );

  await sequelize.authenticate();

  return sequelize;
};
