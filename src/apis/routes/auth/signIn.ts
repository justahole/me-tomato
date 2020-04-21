import Joi from '@hapi/joi'
import { Container } from 'typedi'
import UserService from '@services/User'
import { isString } from 'lodash'

export const validator = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required(),
})

export const signIn = async (ctx): Promise<void> => {
  const { password, email } = ctx.request.body
  const userService = Container.get(UserService)
  const result = await userService.signIn({ email, password })
  if (isString(result)) {
    ctx.throw(400, result)
  } else {
    ctx.body = result
  }
}
