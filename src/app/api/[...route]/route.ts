import { handle } from "hono/vercel";

import { app } from "~/server/presentation";

export const GET = handle(app);
export const POST = handle(app);
