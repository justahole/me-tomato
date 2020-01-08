import sequelizeLoaders from './sequelize';
import koaLoaders from './koa';

export default async ({koaApp}) => {
  await sequelizeLoaders();
  console.log('database connect success ~~');

  await koaLoaders({koaApp});
  console.log('koa is is ready ~~');
};
