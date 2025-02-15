import Router from "@koa/router";
import { authController } from "../controllers/authController.js";

export const authRouter = new Router();

authRouter.post("/login", authController.login);

// Export the router directly (not as a named export)
export default authRouter;
