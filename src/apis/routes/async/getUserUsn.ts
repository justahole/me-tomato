import { Container } from 'typedi'
import AsyncService from '@services/Async'

export default async (ctx): Promise<void> => {
  const { user_id } = ctx.state

  ctx.body = await Container.get(AsyncService).getUserUsn({ user_id: user_id })
}
