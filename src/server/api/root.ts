import { createTRPCRouter } from "~/server/api/trpc";
import { configRouter } from "./routers/config";
import { dataRouter } from "./routers/data";
import { layoutRouter } from "./routers/layout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  config: configRouter,
  data: dataRouter,
  layout: layoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
