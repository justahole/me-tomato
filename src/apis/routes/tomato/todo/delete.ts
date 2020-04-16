import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '@services/Todo'

export const validator = Joi.object({
  name: Joi.string().required(),
  pin: Joi.boolean(),
})

export default async (ctx): Promise<void> => {
  const todoService = Container.get(TodoService)
  await todoService.delete({ id: ctx.params.id, user_id: ctx.state.user_id })

  ctx.body = {
    code: 0,
    message: 'successfully',
  }
}
