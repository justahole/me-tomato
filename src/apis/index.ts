import Router from 'koa-router'
import isAuth from '@middlewares/isAuth'
import { Container } from 'typedi'
import { get } from 'lodash'
import { Config } from '@root/interfaces/config'

import authRouter from './routes/auth'
import tomatoRouter from './routes/tomato'
import asyncRouter from './routes/async'

export default () => {
  const secret = get(Container.get<Config>('config'), 'app.jwtSecret')
  const authChecker = isAuth({
    secret: secret,
  })

  const router = new Router()

  router.use(authRouter.routes())

  router.use('/todo', authChecker, tomatoRouter.routes())

  router.use('/async', authChecker, asyncRouter.routes())

  return router.routes()
}
