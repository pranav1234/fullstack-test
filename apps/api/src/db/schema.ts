import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const contentTypes = sqliteTable("content_types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  assetClassId: integer("asset_class_id"),
});

export const channels = sqliteTable("channels", {
  id: integer("rowid").primaryKey(), // Use SQLite's rowid
  slug: text("slug").notNull().unique(),
  badge: text("badge"),
  name: text("name"),
});

export const regions = sqliteTable("regions", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
});

export const analysts = sqliteTable("analysts", {
  slug: text("slug").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  picture: text("picture"),
});

export const articles = sqliteTable("articles", {
  slug: text("slug").primaryKey(),
  contentTypeId: integer("content_type_id")
    .notNull()
    .references(() => contentTypes.id),
  channelId: integer("channel_id")
    .notNull()
    .references(() => channels.slug),
  title: text("title").notNull(),
  summary: text("summary"),
  content: text("content"),
  publishedAt: text("published_at").notNull(),
});

export const articleRegions = sqliteTable(
  "article_regions",
  {
    articleSlug: text("article_slug").references(() => articles.slug),
    regionId: integer("region_id").references(() => regions.id),
  },
  (table) => ({
    pk: primaryKey(table.articleSlug, table.regionId),
  })
);

export const articleAnalysts = sqliteTable(
  "article_analysts",
  {
    articleSlug: text("article_slug").references(() => articles.slug),
    analystSlug: text("analyst_slug").references(() => analysts.slug),
  },
  (table) => ({
    pk: primaryKey(table.articleSlug, table.analystSlug),
  })
);

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

// Define article relations
export const articlesRelations = relations(articles, ({ one, many }) => ({
  channel: one(channels, {
    fields: [articles.channelId],
    references: [channels.id],
  }),
  articleAnalysts: many(articleAnalysts, {
    fields: [articles.slug],
    references: [articleAnalysts.articleSlug],
  }),
}));

//  Define article-analysts relations
export const articleAnalystsRelations = relations(
  articleAnalysts,
  ({ one }) => ({
    article: one(articles, {
      fields: [articleAnalysts.articleSlug],
      references: [articles.slug],
    }),
    analyst: one(analysts, {
      fields: [articleAnalysts.analystSlug],
      references: [analysts.slug],
    }),
  })
);

// Define analyst relations
export const analystsRelations = relations(analysts, ({ many }) => ({
  articleAnalysts: many(articleAnalysts, {
    fields: [analysts.slug],
    references: [articleAnalysts.analystSlug],
  }),
}));

export type Article = typeof articles.$inferSelect;
export type User = typeof users.$inferSelect;
