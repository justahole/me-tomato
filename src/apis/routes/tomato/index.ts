import Router from 'koa-router'
import { Container } from 'typedi'
import { get } from 'lodash'

import validate from '../../middlewares/validator'
import isAuth from '../../middlewares/isAuth'
import querystringparse from '../../middlewares/querystringparse'

import { createTodo, validator as createTodoValidator } from './todo/create'
import { getTodos, validator as getTodosValidator } from './todo/getList'
import editTodo from './todo/edit'
import deleteTodo from './todo/delete'

const todoApiRouter = new Router()

todoApiRouter
  .post('/', validate({ body: createTodoValidator }), createTodo)
  .delete('/:id', deleteTodo)
  .patch('/:id', editTodo)
  .get(
    '/',
    querystringparse({
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'comma',
    }),
    validate({ 'state.query': getTodosValidator }),
    getTodos
  )

export default (app: Router): void => {
  const config = Container.get('config') as any
  const jwtSecret = get(config, 'app.jwtSecret', '')
  app.use('/todo', isAuth({ secret: jwtSecret }), todoApiRouter.routes())
}
