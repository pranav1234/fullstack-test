import { db } from "../db/index.js";
import { articles } from "../db/schema.js";
import { sql } from "drizzle-orm";

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
      // Get paginated articles
      db
        .select()
        .from(articles)
        .limit(limit)
        .offset(offset)
        .orderBy(articles.publishedAt),

      // Get total count
      db.select({ count: sql<number>`count(*)` }).from(articles),
    ]);

    const total = Number(countResult[0].count);
    const totalPages = Math.ceil(total / limit);

    return {
      articles: articlesResult,
      total,
      totalPages,
    };
  }
}

export const articleService = new ArticleService();
