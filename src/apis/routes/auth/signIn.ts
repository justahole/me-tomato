import Joi from '@hapi/joi';
import {Container} from 'typedi';
import UserService from '../../../services/User';

export const validator = Joi.object({
  email: Joi.string().required()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
  password: Joi.string().required(),
});

export const signIn = async (ctx, next) => {
  const {password, email} = ctx.request.body;
  const userService = Container.get(UserService);
  const token = await userService.signIn({email, password});
  ctx.body = {token};
};
