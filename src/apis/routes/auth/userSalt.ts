import * as Joi from '@hapi/joi';
import {Container} from 'typedi';
import UserService from '../../../services/User';

export const validator = Joi.object({
  email: Joi.string()
      .required()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
});

export const getUserSalt = async (ctx, next) => {
  const {email} = ctx.request.query;
  const userService = Container.get(UserService);

  try {
    ctx.body = {
      salt: await userService.getSalt(email),
    };
  } catch (e) {
    ctx.body = e.message;
  }
};
