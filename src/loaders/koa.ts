import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Container } from 'typedi'

import createRouter from '../apis'

export default async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  /**
   * config koa application
   */
  const config = Container.get('config')
  koaApp.keys = config.app.keys

  koaApp.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const { status, statusCode } = err
      ctx.status = statusCode || status || 500

      if (ctx.status !== 500) {
        ctx.body = {
          message: err.message,
        }
      }

      if (ctx.status === 500 && process.env.NODE_ENV === 'development') {
        ctx.body = err.stack
      }

      err.status = ctx.status
      koaApp.emit('error', err)
    }
  })

  koaApp.on('error', (error) => {
    console.error(
      `😿 request error status ${error.status} , detail =====> `,
      error
    )
  })

  koaApp.use(bodyParser())
  koaApp.use(createRouter())
}
