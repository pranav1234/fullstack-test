import { Context } from "koa";
import { articleController } from "../articleController";
import { articleService } from "../../services/articleService";

// Mock the articleService
jest.mock("../../services/articleService");

describe("articleController", () => {
  let mockCtx: Partial<Context>;

  beforeEach(() => {
    // Reset mock context before each test
    mockCtx = {
      body: undefined,
      params: {},
      query: {},
    };
  });

  describe("getArticles", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return all articles", async () => {
      // Arrange
      const mockArticles = [
        {
          slug: "test-article-1",
          contentTypeId: 1,
          channelId: "news",
          title: "Test Article 1",
          publishedAt: "2024-03-20",
        },
        {
          slug: "test-article-2",
          contentTypeId: 2,
          channelId: "blog",
          title: "Test Article 2",
          publishedAt: "2024-03-21",
        },
      ];

      (articleService.getAllArticles as jest.Mock).mockResolvedValue(
        mockArticles
      );

      // Act
      await articleController.getArticles(mockCtx as Context);

      // Assert
      expect(mockCtx.body).toEqual(mockArticles);
      expect(articleService.getAllArticles).toHaveBeenCalledTimes(1);
    });

    it("should handle empty article list", async () => {
      // Arrange
      (articleService.getAllArticles as jest.Mock).mockResolvedValue([]);

      // Act
      await articleController.getArticles(mockCtx as Context);

      // Assert
      expect(mockCtx.body).toEqual([]);
      expect(articleService.getAllArticles).toHaveBeenCalledTimes(1);
    });

    it("should handle service errors", async () => {
      // Arrange
      const error = new Error("Database error");
      (articleService.getAllArticles as jest.Mock).mockRejectedValue(error);

      // Act & Assert
      await expect(
        articleController.getArticles(mockCtx as Context)
      ).rejects.toThrow("Database error");
    });
  });
});
