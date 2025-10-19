import { Hono } from "hono";

import { type AuthType, auth } from "~/lib/auth";

/**
 * BetterAuth認証ルーター
 * 公式ドキュメント準拠: https://www.better-auth.com/docs/integrations/hono
 *
 * すべての認証リクエスト (POST/GET) をBetterAuthハンドラに転送
 * - /auth/sign-in/email
 * - /auth/sign-up/email
 * - /auth/sign-out
 * - /auth/session
 */
const app = new Hono<{ Variables: AuthType }>({ strict: false });

export const authRouter = app.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
