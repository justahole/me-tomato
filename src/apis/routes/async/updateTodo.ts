import { Container } from 'typedi'
import AsyncService from '@services/Async'

export default async (ctx): Promise<void> => {
  const { user_id } = ctx.state
  const { todoID } = ctx.params
  const params = ctx.request.body

  ctx.body = await Container.get(AsyncService).updateTodo({
    user_id: user_id,
    todoID: todoID,
    ...params,
  })
}
