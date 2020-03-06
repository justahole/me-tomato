import bodyParser from 'koa-bodyparser';

import config from '../config';
import createRouter from '../apis';

export default async ({koaApp}) => {
  /**
   * config koa application
   */
  koaApp.keys = config.app.keys;

  koaApp.use(bodyParser());
  koaApp.use(createRouter());
  koaApp.on('error', (err) => console.error('server error', err));
};
