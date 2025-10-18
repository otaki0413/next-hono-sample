import { OpenAPIHono } from "@hono/zod-openapi";
import { authRouter } from "./auth";

export const app = new OpenAPIHono()
  .basePath("/api")
  .route("/auth", authRouter);
// .route("/tasks", taskRouter);

export type AppType = typeof app;
