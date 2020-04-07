import queryString from 'query-string'  

export default function(options) {
  return async (ctx, next) => {
    ctx.state.query = queryString.parse(ctx.request.querystring, options)
    await next()
  }
}
