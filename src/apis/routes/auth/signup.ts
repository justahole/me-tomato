import * as Joi from '@hapi/joi'

export const validator = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

export const signUp = async (ctx, next) => {
  ctx.body = ctx.request.body
}