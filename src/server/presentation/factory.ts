import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

/**
 * エラーハンドリング付きの`OpenAPIHono インスタンスを作成するFactory関数
 *
 * Zodバリデーションエラーが発生した場合、`HTTPException(400)`をthrowして
 * 共通のエラーハンドリング``app.onError``に処理を移譲する
 *
 * 参考：https://github.com/honojs/middleware/tree/main/packages/zod-openapi#a-dry-approach-to-handling-validation-errors
 */
export function createOpenAPIHono() {
  return new OpenAPIHono({
    defaultHook: (result) => {
      if (!result.success) {
        throw new HTTPException(400, {
          message: "Bad Request",
          cause: result.error,
        });
      }
    },
  });
}
