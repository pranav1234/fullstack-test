import Router from "@koa/router";
import { articleRoutes } from "./articles.js";
import authRouter from "./auth.js";

const router = new Router();

router.use("/auth", authRouter.routes());
router.use("/articles", articleRoutes.routes());

export default router;
