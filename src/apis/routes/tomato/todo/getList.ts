import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '../../../../services/Todo'
import queryString from 'query-string'  

export const validator = Joi.object({
})

export const getTodos = async (ctx): Promise<void> => {
  const { user_id } = ctx.state
  const query = queryString.parse(ctx.request.querystring, { parseBooleans: true })

  const todoService = Container.get(TodoService)

  try {
    ctx.body = await todoService.getList({ ...query, user_id })
  } catch (e) {
    ctx.throw(400, JSON.stringify(e), {
      detail: e,
    })
  }
}
