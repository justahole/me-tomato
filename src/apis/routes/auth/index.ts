import Router from 'koa-router'

import validate from '@middlewares/validator'

import { signUp, validator as SignUpValidator } from './signUp'
import { signIn, validator as SignInValidator } from './signIn'
import { getUserSalt, validator as UserNameValidator } from './userSalt'

export default new Router()
  .post('/signUp', validate({ body: SignUpValidator }), signUp)
  .get('/userSalt', validate({ query: UserNameValidator }), getUserSalt)
  .post('/signIn', validate({ body: SignInValidator }), signIn)
