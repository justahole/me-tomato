import Router from 'koa-router'

import auth from './routes/auth'
import tomato from './routes/tomato'
// import async from './routes/async'

export default () => {
  const router = new Router()

  auth(router)
  tomato(router)
  // async(router)

  return router.routes()
}
