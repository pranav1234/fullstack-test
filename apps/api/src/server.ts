import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import { DefaultState, DefaultContext } from "koa";

const app = new Koa<DefaultState, DefaultContext>();
const router = new Router<Koa.DefaultState, Koa.DefaultContext>();

router.get("/api", (ctx) => {
  ctx.body = { message: "Hello from Koa API!" };
});

app.use(cors() as Koa.Middleware);
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
