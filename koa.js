class Koa {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  start({ req }) {
    const composed = composeMiddlewares(this.middlewares);
    const ctx = { req, res: undefined };
    return composed(ctx);
  }
}

function composeMiddlewares(middlewares) {
  return function (ctx) {
     function dispatch(i) {
      index = i;
      const fn = middlewares[i];  
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
    }
    return dispatch(0);
  };
}

async function middleware1(ctx,next){
  console.log("middleware1~start");
  await next();
  console.log("middleware1~end");
}

async function middleware2(ctx,next){
  console.log("middleware2~start");
  await next();
  console.log("middleware2~end");
}


const app = new Koa();
app.use(middleware1);
app.use(middleware2);
app.start({ req: "ssh" });