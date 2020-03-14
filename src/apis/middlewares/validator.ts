
/**
 * @todo a rules interface
 * @param {object} rules
 * @return {promise | error}
 */
export default function(rules: object) {
  return (ctx, next) => {
    const {request} = ctx

    const isValid = Object.entries(rules).every(([key, validator]) => {
      const {error} = validator.validate(request[key])
      if (error) {
        ctx.throw(400, error.message, {error: error})
        return false
      }
      return true
    })

    if (isValid) {
      return next()
    }
  }
}
