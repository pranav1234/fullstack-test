import { Context } from "koa";
import { articleService } from "../services/articleService.js";

export const articleController = {
  getArticles: async (ctx: Context) => {
    const page = parseInt(ctx.query.page as string) || 1;
    const limit = parseInt(ctx.query.limit as string) || 10;

    const { articles, total, totalPages } = await articleService.getAllArticles(
      page,
      limit
    );

    ctx.body = {
      status: "success",
      data: {
        articles,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
        },
      },
    };
  },
};
