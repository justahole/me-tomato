import './node-version-check'

import 'module-alias/register'
import 'reflect-metadata'
import Koa from 'koa'
import { Container } from 'typedi'
import loaders from './loaders'
import config from './config'
// import { Config } from './interfaces/config'

Container.set('config', config)

/**
 * Search entry
 */
async function createServer() {
  const app = new Koa()

  await loaders({ koaApp: app })

  app.listen(config.app.port, () =>
    console.log('✌️ server listen successfully ~~')
  )
}

createServer()
