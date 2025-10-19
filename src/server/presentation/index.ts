import type { ErrorSchema } from "./error";

import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { flattenError, ZodError } from "zod";

import { env } from "~/lib/env";
import { authRouter } from "./auth";
import { taskRouter } from "./task";

export const app = new OpenAPIHono()
  .basePath("/api")
  .route("/auth", authRouter)
  .route("/tasks", taskRouter);

export type AppType = typeof app;

/**
 * アプリケーション共通エラーハンドリング
 * `ErrorSchema`型でレスポンスを構築する
 */
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json<ErrorSchema>(
      {
        message: error.message,
        ...(error.cause instanceof ZodError && {
          errors: Object.fromEntries(
            Object.entries(flattenError(error.cause).fieldErrors).filter(
              (x): x is [string, string[]] => !!x[1],
            ),
          ),
        }),
      },
      error.status,
    );
  }
  return c.json<ErrorSchema>({ message: "Internal Server Error" }, 500);
});

if (env.NODE_ENV !== "production") {
  /**
   * OpenAPI仕様書のエンドポイント
   * - `/api/doc`: OpenAPI仕様書(JSON)のエンドポイント
   * - `/api/swagger`: Swagger UIのエンドポイント
   */
  app.doc("/doc", {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "Next Hono Sample API",
    },
  });
  app.get("/swagger", swaggerUI({ url: "/api/doc" }));
}
