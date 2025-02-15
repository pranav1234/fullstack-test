import Router from "@koa/router";
import { articleRoutes } from "./articles.js";

const router = new Router();

router.use("/articles", articleRoutes.routes());

export default router;
