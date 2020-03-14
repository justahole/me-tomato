import Joi from '@hapi/joi'
import {Container} from 'typedi'
import UserService from '../../../services/User'

export const validator = Joi.object({
  email: Joi.string()
    .required()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password')

export const signUp = async (ctx): void=> {
  const {password, email} = ctx.request.body
  const userService = Container.get(UserService)
  try {
    ctx.body = await userService.signUp({email, password})
  } catch (e) {
    /**
     * @TODO need good tips
     */
    ctx.throw(400, JSON.stringify(e), {
      detail: e,
    })
  }
}
