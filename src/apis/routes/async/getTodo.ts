import Joi from '@hapi/joi'
import { Container } from 'typedi'
import AsyncService from '@services/Async'

export const validator = Joi.object({
  name: Joi.string().required(),
})

export default async (ctx): Promise<void> => {
  const { afterUsn } = ctx.params
  const { user_id } = ctx.state

  const service = Container.get(AsyncService)
  ctx.body = await service.getUSNChunkAfterUSN({ user_id, afterUsn })
}
