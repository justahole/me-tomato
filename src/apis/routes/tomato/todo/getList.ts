import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '../../../../services/Todo'

export const validator = Joi.object({
  limit: Joi.number(),
  offset: Joi.number(),
  complete: Joi.boolean(),
  pin: Joi.boolean(),
})

export const getTodos = async (ctx): Promise<void> => {
  const { user_id } = ctx.state
  const query = ctx.state.query

  const todoService = Container.get(TodoService)

  const params = {
    user_id: user_id,
    ...query
  }

  ctx.body = await todoService.getList(params)
}
