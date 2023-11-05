import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  getConfigRepository,
  saveUserWidgetConfig,
} from "~/server/repository/config/configRepository";
import {
  getLayoutRepository,
  updateUserWidgetLayout,
} from "~/server/repository/layout/layoutRepository";
import transformWidgetData from "~/server/service/transformWidgetDataService";
import Log from "~/utils/log";
import { screenSizePositioningSchema, widgetTypeSchema } from "~/utils/schema";

export const configRouter = createTRPCRouter({
  getWidgetConfig: protectedProcedure.query(async () => {
    try {
      const storedConfigs = await getConfigRepository().getAll();
      const configData = await transformWidgetData(storedConfigs);
      return configData;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget config",
      });
    }
  }),
  setAllWidgetConfig: protectedProcedure
    .input(
      z.object({
        widgets: z.array(z.any()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await saveUserWidgetConfig(input.widgets, getConfigRepository());
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
  setWidgetConfigForWidget: protectedProcedure // TODO: rework
    .input(
      z.object({
        id: z.string(),
        type: widgetTypeSchema,
        layout: screenSizePositioningSchema,
        data: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const widget = {
        type: input.type,
        layout: input.layout,
        data: JSON.parse(input.data),
      };
      try {
        await updateUserWidgetLayout(input.id, widget, getLayoutRepository());
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
});
