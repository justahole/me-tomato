import Koa from 'koa'
import sequelizeLoaders from './sequelize'
import koaLoaders from './koa'
import dependencyInjectLoaders from './dependency'

export default async ({ koaApp }: {koaApp: Koa}): Promise<void> => {
  const sequelize = await sequelizeLoaders()
  console.log('✌️ database loaded ~~')

  await dependencyInjectLoaders({
    sequelize,
  })
  console.log('✌️ dependency injected ~~')

  await koaLoaders({ koaApp })
  console.log('✌️ koa loaded ~~')
}
