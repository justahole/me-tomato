import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '../../../../services/Todo'

export const validator = Joi.object({
  name: Joi.string().required(),
  pin: Joi.boolean()
})

export const createTodo = async (ctx): Promise<void> => {
  const { name, pin } = ctx.request.body
  const { user_id } = ctx.state
  const todoService = Container.get(TodoService)

  try {
    ctx.body = await todoService.create({ user_id, name, pin })
  } catch (e) {
    ctx.throw(400, JSON.stringify(e), {
      detail: e,
    })
  }
}
