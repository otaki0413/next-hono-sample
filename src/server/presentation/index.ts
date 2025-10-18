import type { ErrorSchema } from "./error";

import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { flattenError, ZodError } from "zod";

import { authRouter } from "./auth";

export const app = new OpenAPIHono()
  .basePath("/api")
  .route("/auth", authRouter);

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
