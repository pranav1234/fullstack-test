import { Context, Next } from "koa";

interface AppError extends Error {
  status?: number;
  stack?: string;
}

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    const error = err as AppError;
    ctx.status = error.status || 500;
    ctx.body = {
      error: {
        message: error.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
    };
    ctx.app.emit("error", error, ctx);
  }
};
