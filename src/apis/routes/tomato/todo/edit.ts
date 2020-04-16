import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '../../../../services/Todo'

export const validator = Joi.object({
  name: Joi.string().required(),
  pin: Joi.boolean(),
})

export default async (ctx): Promise<void> => {
  const body = ctx.request.body
  const todoService = Container.get(TodoService)
  await todoService.edit({
    id: ctx.params.id,
    user_id: ctx.state.user_id,
    ...body,
  })

  ctx.body = {
    code: 0,
    message: 'successfully',
  }
}
