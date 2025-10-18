import type { AppType } from "~/server/presentation";

import { hc } from "hono/client";

import { env } from "~/lib/env";

export const fetchClient = hc<AppType>(env.NEXT_PUBLIC_BASE_URL);
