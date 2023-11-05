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
import transformWidgetLayout from "~/server/service/transformWidgetLayoutService";
import updateWidgetLayoutService from "~/server/service/updateWidgetLayoutService";
import AppError from "~/utils/error";
import Log from "~/utils/log";
import {
  screenSizePositioningSchema,
  widgetLayoutSchema,
  widgetTypeSchema,
} from "~/utils/schema";

export const widgetRouter = createTRPCRouter({
  getWidgetLayout: protectedProcedure.query(async () => {
    try {
      const storedLayouts = await getLayoutRepository().getAll();
      const layoutData = transformWidgetLayout(storedLayouts);
      return layoutData;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget layout",
      });
    }
  }),
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
  getLayoutForWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await getLayoutRepository().get(input.id);
        if (!data) {
          throw new AppError(
            `No adjusted widget config for widget with ID ${input.id}`,
          );
        }
        return data;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get widget data",
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
  setWidgetLayout: protectedProcedure // TODO: rework
    .input(
      z.object({
        layout: widgetLayoutSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const widgetConfig = await getLayoutRepository().get();
        const updatedWidgets = updateWidgetLayoutService(
          input.layout,
          widgetConfig,
        );
        await getLayoutRepository().set(updatedWidgets);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget layout",
        });
      }
    }),
});
