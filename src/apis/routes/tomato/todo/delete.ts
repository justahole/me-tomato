import Joi from '@hapi/joi'
import { Container } from 'typedi'
import TodoService from '@services/Todo'

export const validator = Joi.object({
  name: Joi.string().required(),
  pin: Joi.boolean(),
})

export default async (ctx): Promise<void> => {
  const todoService = Container.get(TodoService)
  const { id } = ctx.params
  const { user_id } = ctx.state
  const deleteCount = await todoService.delete({
    id: id,
    user_id: user_id,
  })

  if (deleteCount === 0) {
    ctx.throw(400, `${id} is not found`)
  } else {
    ctx.body = {
      code: 0,
      message: 'successfully',
    }
  }
}
