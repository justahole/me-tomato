import * as Router from 'koa-router'
import validate from '../../middlewares/validator'

import { signUp, validator as SignUpValidator } from './signup'

export default (app: Router) => {
  app.post('/signup', validate({ body: SignUpValidator }), signUp)
}