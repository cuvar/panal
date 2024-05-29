import { TRPCError } from "@trpc/server";
import { z } from "zod";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import { isEmptyPositioning } from "~/lib/service/positioning.service";
import {
  screenSizePositioningSchema,
  screenSizeSchema,
  widgetLayoutSchema,
  widgetTypeSchema,
} from "~/lib/types/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import { getLayoutRepository } from "~/server/domain/layout/repo/layoutRepository";
import hideWidget from "~/server/domain/layout/services/hideWidgetService";
import transformWidgetLayout from "~/server/domain/layout/services/transformWidgetLayoutService";
import updateWidgetLayoutService from "~/server/domain/layout/services/updateWidgetLayoutService";

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
        await getLayoutRepository().set(widget.id, widget);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
  getAllHidden: protectedProcedure
    .input(z.object({ screenSize: screenSizeSchema }))
    .query(async ({ input }) => {
      try {
        const storedLayouts = await getLayoutRepository().getAll();
        const layoutData = transformWidgetLayout(storedLayouts);
        const hiddenWidgets = layoutData.filter((widget) => {
          if (isEmptyPositioning(widget.layout[input.screenSize])) {
            return true;
          }
          return false;
        });
        return hiddenWidgets;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get hidden widget layouts",
        });
      }
    }),
  setHide: protectedProcedure
    .input(
      z.object({
        screenSize: screenSizeSchema,
        hide: z.boolean(),
        widget: AdjustedWidgetLayout.getSchema(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const awc = new AdjustedWidgetLayout(
          input.widget.id,
          input.widget.type,
          input.widget.layout,
        );
        const res = await hideWidget(awc, input.screenSize, input.hide);
        return res;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update hiding status of widget layout",
        });
      }
    }),
});
