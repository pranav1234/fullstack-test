import { db } from "../db/index.js";
import { articles } from "../db/schema.js";
import type { Article } from "../db/schema.js";

export class ArticleService {
  async getAllArticles(): Promise<Article[]> {
    return db.select().from(articles);
  }
}

export const articleService = new ArticleService();
