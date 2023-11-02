import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getWidgetRepository,
  saveUserWidgetConfig,
} from "~/server/repository/widgetRepository";
import transformWidgetData from "~/server/service/transformWidgetDataService";
import updateWidgetLayoutService from "~/server/service/updateWidgetLayoutService";
import Log from "~/utils/log";
import { widgetLayoutSchema } from "~/utils/schema";

export const widgetRouter = createTRPCRouter({
  getWidgetData: protectedProcedure.query(async () => {
    try {
      const widgetsConfig = await getWidgetRepository().get();
      const data = await transformWidgetData(widgetsConfig);
      return data;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget data",
      });
    }
  }),
  getWidgetConfig: protectedProcedure.query(async () => {
    try {
      const data = await getWidgetRepository().get();
      return data;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget config",
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
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
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
        const widgetConfig = await getWidgetRepository().get();
        const updatedWidgets = updateWidgetLayoutService(
          input.layout,
          widgetConfig,
        );
        await getWidgetRepository().set(updatedWidgets);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget layout",
        });
      }
    }),
});
