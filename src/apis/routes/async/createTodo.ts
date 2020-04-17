import Joi from '@hapi/joi'
import { Container } from 'typedi'
import AsyncService from '@services/Async'

export const validator = Joi.object({
  name: Joi.string().required(),
})

export default async (ctx): Promise<void> => {
  const { name } = ctx.request.body
  const { user_id } = ctx.state
  const service = Container.get(AsyncService)
  ctx.body = await service.createTodo({ user_id, name })
}
