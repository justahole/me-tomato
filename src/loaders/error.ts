import Koa from 'koa'
import statuses from 'statuses'

export default async ({ koaApp }: { koaApp: Koa }): Promise<void> => {
  koaApp.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const is500 = 'number' != typeof err.status || !statuses[err.status]

      if (ctx.app.env === 'development' && is500) {
        ctx.throw(500, err.stack || err.message, { expose: true })
      } else {
        ctx.status = err.status
        ctx.body = {
          message: err.message,
        }
        ctx.app.emit('error', err)
      }
    }
  })

  koaApp.on('error', (error) => {
    console.error(
      `😿 request error status ${error.status || 500}, detail =====> `,
      error
    )
  })
}
