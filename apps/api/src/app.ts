import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.js";
import passport from "./config/passport.js";
import authRouter from "./routes/auth.js"; // Import as default
import type { Middleware } from "koa";

const app = new Koa();

// Middleware
app.use(bodyParser());
app.use(errorHandler);

// Initialize passport
app.use(passport.initialize() as Middleware);

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Use the auth routes
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

export default app;
