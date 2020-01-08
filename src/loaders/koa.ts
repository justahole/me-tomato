export default async ({koaApp}) => {
  koaApp.use(async (ctx: any) => {
    ctx.body = 'hello world~~';
  });
};
