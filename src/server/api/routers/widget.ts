import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getWidgets, saveWidgets } from "~/server/repository/widgetRepository";
import getCalendar from "~/server/widgets/calendar";

export const widgetRouter = createTRPCRouter({
  getWidgetData: protectedProcedure.query(async () => {
    try {
      const data = await getWidgets();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error?.message : "",
      });
    }
  }),
  setWidgetData: protectedProcedure
    .input(
      z.object({
        widgets: z.array(z.any()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await saveWidgets(input.widgets);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error?.message : "",
        });
      }
    }),
  getCalendarData: protectedProcedure
    .input(
      z.object({
        link: z.string(),
        daysInAdvance: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const data = await getCalendar(input.link, input.daysInAdvance);
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error?.message : "",
        });
      }
    }),
});
