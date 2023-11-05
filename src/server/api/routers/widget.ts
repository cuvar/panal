import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getConfigRepository } from "~/server/repository/config/configRepository";
import {
  getLayoutRepository,
  saveUserWidgetConfig,
  updateUserWidgetConfig,
} from "~/server/repository/layout/widgetRepository";
import transformWidgetData from "~/server/service/transformWidgetDataService";
import updateWidgetLayoutService from "~/server/service/updateWidgetLayoutService";
import AppError from "~/utils/error";
import Log from "~/utils/log";
import {
  screenSizePositioningSchema,
  widgetLayoutSchema,
  widgetTypeSchema,
} from "~/utils/schema";

export const widgetRouter = createTRPCRouter({
  getWidgetData: protectedProcedure.query(async () => {
    try {
      const storedConfigs = await getConfigRepository().getAll();
      const storedLayouts = await getLayoutRepository().get();
      const data = await transformWidgetData(storedConfigs, storedLayouts);
      return data;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget data",
      });
    }
  }),
  getAdjustedWidgetConfigForWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await getLayoutRepository().get();
        const res = data.find((d) => d.id == input.id);
        if (!res) {
          throw new AppError(
            `No adjusted widget config for widget with ID ${input.id}`,
          );
        }
        return res;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get widget data",
        });
      }
    }),
  getConfigForWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await getConfigRepository().get(input.id);
        if (!data) {
          throw new AppError(
            `No adjusted widget config for widget with ID ${input.id}`,
          );
        }
        return res;
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
      const data = await getLayoutRepository().get();
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
        await saveUserWidgetConfig(input.widgets, getLayoutRepository());
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
  setWidgetConfigForWidget: protectedProcedure
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
        await updateUserWidgetConfig(input.id, widget, getLayoutRepository());
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
