import jwt from 'jsonwebtoken'
import parseBearerToken from 'parse-bearer-token'

export default function ({ secret }) {
  return async (ctx, next) => {
    const token = parseBearerToken(ctx.request)
    if (!token) {
      return ctx.throw(401, 'Miss Authorization')
    }

    try {
      const { id } = jwt.verify(token, secret)
      ctx.state.user_id = id
    } catch (e) {
      ctx.throw(401, 'Authorization Failed')
    }

    await next()
  }
}
