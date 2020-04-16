import Router from 'koa-router'

import auth from './routes/auth'
import tomato from './routes/tomato'
// import async from './routes/async'

export default () => {
  const app = new Router()

  auth(app)
  tomato(app)
  // async(app)

  return app.routes()
}
