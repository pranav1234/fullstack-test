import { Context } from "koa";
import { articleService } from "../services/articleService.js";

export const articleController = {
  getArticles: async (ctx: Context) => {
    ctx.body = await articleService.getAllArticles();
  },
};
