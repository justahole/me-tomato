import Router from 'koa-router'

import validate from '../../middlewares/validator'

import { signUp, validator as SignUpValidator } from './signUp'
import { signIn, validator as SignInValidator } from './signIn'
import { getUserSalt, validator as UserNameValidator } from './userSalt'

export default (app: Router): void => {
  app.post('/signUp', validate({ body: SignUpValidator }), signUp)
  app.get('/userSalt', validate({ query: UserNameValidator }), getUserSalt)
  app.post('/signIn', validate({ body: SignInValidator }), signIn)
}
