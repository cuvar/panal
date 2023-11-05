import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    USERNAME: z.string().min(1),
    PASSWORD: z.string().min(1),
    EMAIL: z.string().email(),
    WIDGET_STORE: z.enum(["mock", "upstash", "file"]),
    UPSTASH_ENDPOINT:
      process.env.WIDGET_STORE === "upstash"
        ? z.string().url()
        : z.string().url().optional(),
    UPSTASH_TOKEN:
      process.env.WIDGET_STORE === "upstash"
        ? z.string().min(1)
        : z.string().min(1).optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_COOKIE_NAME: z.string().min(1),
    NEXT_PUBLIC_PANAL_DEBUG: z.enum(["true", "false"]).optional(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL,
    WIDGET_STORE: process.env.WIDGET_STORE,
    UPSTASH_ENDPOINT: process.env.UPSTASH_ENDPOINT,
    UPSTASH_TOKEN: process.env.UPSTASH_TOKEN,
    NEXT_PUBLIC_PANAL_DEBUG: process.env.NEXT_PUBLIC_PANAL_DEBUG,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
