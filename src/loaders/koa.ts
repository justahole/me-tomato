import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import {Z_SYNC_FLUSH} from 'zlib';

import config from '../config';
import createRouter from '../apis';

export default async ({koaApp}) => {
  /**
   * config koa application
   */
  koaApp.keys = config.app.keys;
  koaApp.use(
      compress({
        filter(contentType) {
          return /(text|javascript)/i.test(contentType);
        },
        threshold: 2048,
        flush: Z_SYNC_FLUSH,
      }),
  );

  koaApp.use(bodyParser());
  koaApp.use(createRouter());
  koaApp.on('error', (err) => console.error('server error', err));
};
