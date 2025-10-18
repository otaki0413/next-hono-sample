import type { Route } from "next";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(
      new URL("/signin" satisfies Route, request.url)
    );
  }

  return NextResponse.next();
}

// ミドルウェアの実行パス
export const config = {
  runtime: "nodejs",
  // 認証が不要なパス一覧を否定先読みで指定する
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)"],
};
