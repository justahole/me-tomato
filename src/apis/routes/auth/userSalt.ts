import Joi from '@hapi/joi'
import { Container } from 'typedi'
import UserService from '../../../services/User'

export const validator = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

export const getUserSalt = async (ctx): Promise<void> => {
  const { email } = ctx.request.query
  const userService = Container.get(UserService)
  try {
    const salt = await userService.getSalt(email)
    ctx.body = { salt }
  } catch (e) {
    ctx.throw(400, JSON.stringify(e), {
      detail: e,
    })
  }
}
