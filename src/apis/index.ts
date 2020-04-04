import Router from 'koa-router'

import auth from './routes/auth'
import tomato from './routes/tomato'

export default () => {
  const app = new Router()

  auth(app)
  tomato(app)

  return app.routes()
}
