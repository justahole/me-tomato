import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import config from '../config'
import createRouter from '../apis'

export default async ({koaApp}: {koaApp: Koa}): Promise<void> => {
  /**
   * config koa application
   */
  koaApp.keys = config.app.keys

  koaApp.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const {status, statusCode} = err
      ctx.status = statusCode || status
      ctx.body = {
        message: err.message,
      }
      koaApp.emit('error', err)
    }
  })

  koaApp.on('error',
    (error) => {
      console.error(`😿 request error status ${error.status} , detail =====> `,
        JSON.stringify(error, null, ' '))
    })

  koaApp.use(bodyParser())
  koaApp.use(createRouter())
}
