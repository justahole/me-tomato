import sequelizeLoaders from './sequelize';
import koaLoaders from './koa';

export default async ({koaApp}) => {
  await sequelizeLoaders();
  console.log('✌️ database loaded ~~');

  await koaLoaders({koaApp});
  console.log('✌️ koa loaded ~~');
};
