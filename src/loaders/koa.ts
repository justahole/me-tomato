import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Container } from 'typedi'
import { Config } from '@root/interfaces/config'

import createRouter from '../apis'

export default async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  /**
   * config koa application
   */
  const config = Container.get<Config>('config')
  koaApp.keys = config.app.keys

  koaApp.use(bodyParser())
  koaApp.use(createRouter())
}
