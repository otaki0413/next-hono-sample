import { hc } from "hono/client";
import { env } from "~/lib/env";
import type { AppType } from "~/server/presentation";

export const fetchClient = hc<AppType>(env.NEXT_PUBLIC_BASE_URL);
