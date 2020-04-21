import Koa from 'koa'
import sequelizeLoaders from './sequelize'
import koaLoaders from './koa'
import dependencyInjectLoaders from './dependency'
import errorHandler from './error'

export default async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  const sequelize = await sequelizeLoaders()
  console.log('✌️ connect to mysql server ~~')

  await dependencyInjectLoaders({
    sequelize,
  })
  console.log('✌️ set mysql table relationship and set Model in container ~~')

  await errorHandler({ koaApp })
  console.log('✌️ erorr handler injected ~~')

  await koaLoaders({ koaApp })
  console.log('✌️ koa loaded ~~')
}
