import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getWidgetsConfig,
  saveWidgetsConfig,
} from "~/server/repository/widgetRepository";
import getWidgetData from "~/server/service/getWidgetDataService";

export const widgetRouter = createTRPCRouter({
  getWidgetData: protectedProcedure.query(async () => {
    try {
      const data = await getWidgetData();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error?.message : "",
      });
    }
  }),
  getWidgetConfig: protectedProcedure.query(async () => {
    try {
      const data = await getWidgetsConfig();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error?.message : "",
      });
    }
  }),
  setWidgetConfig: protectedProcedure
    .input(
      z.object({
        widgets: z.array(z.any()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await saveWidgetsConfig(input.widgets);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error?.message : "",
        });
      }
    }),
});
