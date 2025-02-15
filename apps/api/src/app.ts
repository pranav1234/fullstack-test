import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.js";

const app = new Koa();

// Middleware
app.use(bodyParser());
app.use(errorHandler);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
