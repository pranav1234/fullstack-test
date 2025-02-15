import Router from "@koa/router";
import { articleController } from "../controllers/articleController.js";

export const articleRoutes = new Router();

articleRoutes.get("/", articleController.getArticles);
