import * as Koa from 'koa';
import loaders from './loaders';
import config from './config';

/**
 * Search entry
 */
async function createServer() {
  const app = new Koa();

  await loaders({koaApp: app});

  app.listen(
      config.app.port,
      () => console.log('✌️ server listen successfully ~~'),
  );
}

createServer();
