import Router from "@koa/router";
import { articleController } from "../controllers/articleController.js";
import passport from "../config/passport.js";
import type { Middleware } from "koa";

// Create auth middleware
const auth = passport.authenticate("jwt", { session: false }) as Middleware;

export const articleRoutes = new Router();

// Public route - list articles with summaries only
articleRoutes.get("/", articleController.getArticles);

// Protected route - get full article by slug
articleRoutes.get("/:slug", auth, articleController.getArticleBySlug);

export default articleRoutes;
