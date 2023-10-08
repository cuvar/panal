import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getAdjustedWidgetConfig,
  saveAdjustedWidgetConfig,
  saveUserWidgetConfig,
} from "~/server/repository/widgetRepository";
import transformWidgetData from "~/server/service/transformWidgetDataService";
import updateWidgetLayoutService from "~/server/service/updateWidgetLayoutService";
import { widgetLayoutSchema } from "~/utils/schema";

export const widgetRouter = createTRPCRouter({
  getWidgetData: protectedProcedure.query(async () => {
    try {
      const widgetsConfig = await getAdjustedWidgetConfig();
      const data = transformWidgetData(widgetsConfig);
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
      const data = await getAdjustedWidgetConfig();
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
        await saveUserWidgetConfig(input.widgets);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error?.message : "",
        });
      }
    }),
  setWidgetLayout: protectedProcedure
    .input(
      z.object({
        layout: widgetLayoutSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const widgetConfig = await getAdjustedWidgetConfig();
        const updatedWidgets = updateWidgetLayoutService(
          input.layout,
          widgetConfig,
        );
        await saveAdjustedWidgetConfig(updatedWidgets);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error?.message : "",
        });
      }
    }),
});
