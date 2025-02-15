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
    jest.clearAllMocks();
  });

  describe("getArticles", () => {
    it("should return paginated articles", async () => {
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

      const mockPaginatedResponse = {
        articles: mockArticles,
        total: 10,
        totalPages: 5,
      };

      (articleService.getAllArticles as jest.Mock).mockResolvedValue(
        mockPaginatedResponse
      );

      mockCtx.query = { page: "2", limit: "2" };

      // Act
      await articleController.getArticles(mockCtx as Context);

      // Assert
      expect(mockCtx.body).toEqual({
        status: "success",
        data: {
          articles: mockArticles,
          pagination: {
            currentPage: 2,
            totalPages: 5,
            totalItems: 10,
            itemsPerPage: 2,
          },
        },
      });
      expect(articleService.getAllArticles).toHaveBeenCalledWith(2, 2);
    });

    it("should use default pagination values when not provided", async () => {
      // Arrange
      const mockPaginatedResponse = {
        articles: [],
        total: 0,
        totalPages: 0,
      };

      (articleService.getAllArticles as jest.Mock).mockResolvedValue(
        mockPaginatedResponse
      );

      // Act
      await articleController.getArticles(mockCtx as Context);

      // Assert
      expect(articleService.getAllArticles).toHaveBeenCalledWith(1, 10);
      expect(mockCtx.body).toEqual({
        status: "success",
        data: {
          articles: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10,
          },
        },
      });
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

    it("should return empty array when no articles exist", async () => {
      // Arrange
      const mockPaginatedResponse = {
        articles: [],
        total: 0,
        totalPages: 0,
      };

      (articleService.getAllArticles as jest.Mock).mockResolvedValue(
        mockPaginatedResponse
      );

      mockCtx.query = {}; // No query parameters provided

      // Act
      await articleController.getArticles(mockCtx as Context);

      // Assert
      expect(mockCtx.body).toEqual({
        status: "success",
        data: {
          articles: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10,
          },
        },
      });
      expect(articleService.getAllArticles).toHaveBeenCalledWith(1, 10);
    });
  });
});
