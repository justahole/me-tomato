
/**
 * @todo a rules interface
 */
export default (rules: object) => {
  return async (ctx, next) => {
    const { request } = ctx 
    const isValid = Object.entries(rules).every(([key, validator]) => {
      const { error } = validator.validate(request[key])
      if (error) {
        ctx.body = error.message;
        return false
      }
      return true
    })

    if (isValid) { next() }
  }
}