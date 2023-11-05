import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AdjustedWidgetLayout } from "~/server/entities/adjustedWidgetLayout";
import {
  getLayoutRepository,
  updateUserWidgetLayout,
} from "~/server/repository/layout/layoutRepository";
import transformWidgetLayout from "~/server/service/transformWidgetLayoutService";
import updateWidgetLayoutService from "~/server/service/updateWidgetLayoutService";
import AppError from "~/utils/error";
import Log from "~/utils/log";
import {
  screenSizePositioningSchema,
  widgetLayoutSchema,
  widgetTypeSchema,
} from "~/utils/schema";

export const layoutRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
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
  getForWidget: protectedProcedure
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
  setAll: protectedProcedure // TODO: rework
    .input(
      z.object({
        layout: widgetLayoutSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const widgetLayout = await getLayoutRepository().getAll();
        const updatedWidgets = updateWidgetLayoutService(
          input.layout,
          widgetLayout,
        );
        await getLayoutRepository().setAll(updatedWidgets);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget layout",
        });
      }
    }),
  setForWidget: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: widgetTypeSchema,
        layout: screenSizePositioningSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const widget = new AdjustedWidgetLayout(
        input.id,
        input.type,
        input.layout,
      );
      try {
        await updateUserWidgetLayout(widget, getLayoutRepository());
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
});
