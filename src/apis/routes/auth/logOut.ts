import {Container} from 'typedi';
import UserService from '../../../services/User';

export default async (ctx, next) => {
  const {token} = ctx.request.body;
  const userService = Container.get(UserService);

  try {
    await userService.logOut(token);

    ctx.body = {
      code: 0,
      message: 'ok',
    };
  } catch (e) {
    ctx.body = e.message;
  }
};
