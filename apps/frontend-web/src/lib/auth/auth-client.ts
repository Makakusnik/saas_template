import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_SERVER_URL,
  basePath: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_PATH,
  fetchOptions: {
    credentials: "include",
  },
});

export type Session = typeof authClient.$Infer.Session;
