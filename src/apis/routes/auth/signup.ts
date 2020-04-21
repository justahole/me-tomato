import Joi from '@hapi/joi'
import { Container } from 'typedi'
import UserService from '@services/User'
import { get } from 'lodash'

export const validator = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

export const signUp = async (ctx): Promise<void> => {
  const { password, email } = ctx.request.body
  const userService = Container.get(UserService)
  try {
    ctx.body = await userService.signUp({ email, password })
  } catch (e) {
    const hasSignUp = get(e, 'parent.errno') === 1062

    if (hasSignUp) {
      ctx.throw(400, 'This email has sigh up')
    } else {
      throw e
    }
  }
}
