import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * サーバーサイドの環境変数
   */
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },

  /**
   * クライアントサイドの環境変数（NEXT_PUBLIC_ プレフィックスが必須）
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },

  /**
   * 環境変数のランタイム値を指定
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  /**
   * 空文字列をundefinedとして扱う設定
   */
  emptyStringAsUndefined: true,
});
