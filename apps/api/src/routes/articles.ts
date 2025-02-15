import Router from "@koa/router";
import { articleController } from "../controllers/articleController.js";
import passport from "../config/passport.js";
import type { Middleware } from "koa";

// Create auth middleware
const auth = passport.authenticate("jwt", { session: false }) as Middleware;

export const articleRoutes = new Router();

// Protect all article routes with JWT authentication
articleRoutes.use(auth);

// Article routes
articleRoutes.get("/", articleController.getArticles);
articleRoutes.get("/:slug", articleController.getArticleBySlug);

export default articleRoutes;
