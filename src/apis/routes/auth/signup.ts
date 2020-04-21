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

const ERROR_MAP = {
  1062: 'This Email Had Sigh Up',
}

export const signUp = async (ctx): Promise<void> => {
  const { password, email } = ctx.request.body
  const userService = Container.get(UserService)
  try {
    ctx.body = await userService.signUp({ email, password })
  } catch (e) {
    const errno = get(e, 'parent.errno')
    const message = ERROR_MAP[errno]
    if (message) {
      ctx.throw(400, message)
    } else {
      throw e
    }
  }
}
