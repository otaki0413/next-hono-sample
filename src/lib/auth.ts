import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "~/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // MEMO: アプリケーションがデフォルトのポート3000 以外を使用している場合は、下記に追加する
  // trustedOrigins: ["http://localhost:3001", ...]
});
