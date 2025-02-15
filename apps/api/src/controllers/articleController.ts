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

  getArticleBySlug: async (ctx: Context) => {
    try {
      const { slug } = ctx.params;

      if (!slug) {
        ctx.status = 400;
        ctx.body = {
          status: "error",
          message: "Slug is required",
        };
        return;
      }

      const article = await articleService.getArticleBySlug(slug);

      ctx.body = {
        status: "success",
        data: {
          article,
        },
      };
    } catch (error) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: error instanceof Error ? error.message : "Article not found",
      };
    }
  },
};
