import Router from 'koa-router'
import { Container } from 'typedi'

import validate from '../../middlewares/validator'
import isAuth from '../../middlewares/isAuth'

import { createTodo, validator as createTodoValidator } from './todo/create'
import { getTodos } from './todo/getList'

const todoApiRouter = new Router()

todoApiRouter
  .get('/', getTodos)
  .post('/', validate({ body: createTodoValidator }), createTodo)

export default (app: Router): void => {
  const config = Container.get('config') as any
  const { jwtSecret } = config.app
  app.use('/todo', isAuth({ secret: jwtSecret }), todoApiRouter.routes())
}
