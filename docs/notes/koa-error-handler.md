# Koa应用错误的处理

## koa 的默认错误处理

koa 默认会在开始就监听中间件的错误。然后放回 code: error.status || 500, body: {message: error.message || 
'Internal Server Error'(由error.status 映射获得)，headers: error.headers || null } 这样的HTTP报文给客户端。

## Koa 错误处理自定义

```js
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
  })
```

> 原理就是不暴露错误，自定放回给客户端

## Koa 错误监控

有时候我们要看客户端为什么发送请求失败。这个时候就需要使用 app.on('error') 或者 app.onerror, 这里有个问题，就是如果我们定制化了获取除了（如写入上面的代码）。这时候app.on('error') || app.onerror 是不会告警的，所以我们需要手动的emit 出这个错误。

```js
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };

      // 这时候app.on('error') 就能够被触发，而且不会触发 koa 默认的错误机制
      app.emit('error', err)
    }
  })
```

