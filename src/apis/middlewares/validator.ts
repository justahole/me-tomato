
/**
 * @todo a rules interface
 */
export default function(rules: object) {
  return (ctx, next) => {

    const { request } = ctx 

    const isValid = Object.entries(rules).every(([key, validator]) => {
      const { error } = validator.validate(request[key])
      if (error) {
        ctx.throw(400, error.message);
        return false
      }
      return true
    })

    if (isValid) {
      return next()
    }
  }
}