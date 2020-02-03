import * as Router from 'koa-router';

import auth from './routes/auth';

export default () => {
  const app = new Router();

  auth(app);

  return app.routes();
};
