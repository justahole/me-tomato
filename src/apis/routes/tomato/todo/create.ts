import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '@services/Todo'

export const validator = Joi.object({
  name: Joi.string().required(),
})

export const createTodo = async (ctx): Promise<void> => {
  const { name } = ctx.request.body
  const { user_id } = ctx.state
  const todoService = Container.get(TodoService)
  ctx.body = await todoService.create({ user_id, name })
}
