import { db } from "../db/index.js";
import { articles, channels, analysts, articleAnalysts } from "../db/schema.js";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

interface Article {
  slug: string;
  contentTypeId: number;
  channelId: number;
  title: string;
  summary: string | null;
  content: string | null;
  publishedAt: string;
}

export class ArticleService {
  async getAllArticles(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const [articlesResult, countResult] = await Promise.all([
      // Get paginated articles with relations
      db.query.articles.findMany({
        limit,
        offset,
        orderBy: articles.publishedAt,
        with: {
          channel: true,
          articleAnalysts: {
            with: {
              analyst: true,
            },
          },
        },
      }),

      // Get total count
      db.select({ count: sql<number>`count(*)` }).from(articles),
    ]);

    // Transform the results to desired format
    const transformedArticles = articlesResult.map((article) => ({
      ...article,
      channel: article.channel,
      analysts: article.articleAnalysts.map((aa) => aa.analyst),
      articleAnalysts: undefined, // Remove the junction table data
    }));

    const total = Number(countResult[0].count);
    const totalPages = Math.ceil(total / limit);

    return {
      articles: transformedArticles,
      total,
      totalPages,
    };
  }

  async getArticleBySlug(slug: string) {
    const article = await db.query.articles.findFirst({
      where: eq(articles.slug, slug),
      with: {
        channel: true,
        articleAnalysts: {
          with: {
            analyst: true,
          },
        },
      },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    // Transform the result
    return {
      ...article,
      channel: article.channel,
      analysts: article.articleAnalysts.map((aa) => aa.analyst),
      articleAnalysts: undefined, // Remove the junction table data
    };
  }
}

export const articleService = new ArticleService();
