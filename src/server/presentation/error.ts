import { type createRoute, z } from "@hono/zod-openapi";

const errorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())).optional(),
  message: z.string(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;

// アプリケーション全体で共通のエラーレスポンススキーマ
export const appErrorSchema = {
  400: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: errorSchema.openapi({
          example: {
            errors: {
              id: ["IDには記号を含めてください"],
              age: ["年齢は数値で指定してください"],
            },
            message: "Bad Request",
          },
        }),
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: errorSchema.openapi({
          example: {
            message: "Unauthorized",
          },
        }),
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: errorSchema.openapi({
          example: {
            message: "Internal Server Error",
          },
        }),
      },
    },
  },
} as const satisfies Parameters<typeof createRoute>["0"]["responses"];
