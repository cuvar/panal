import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { codes } from "~/lib/error/codes";
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
import { HideInfo } from "~/server/domain/layout/hideInfo";
import { getLayoutRepository } from "~/server/domain/layout/repo/layoutRepository";
import { hideWidgets } from "~/server/domain/layout/services/hideWidgetService";
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
      if (
        error instanceof AppError &&
        error.code[0] &&
        error.code[0] == codes.WIDGET_NONE_FOUND
      ) {
        return [];
      }

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
          throw new AppError(codes.WIDGET_CONFIG_ADJUSTED_MISSING);
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
  hideWidgets: protectedProcedure
    .input(z.array(HideInfo.getSchema()))
    .mutation(async ({ input }) => {
      try {
        const mapped = input.map((w) => {
          const awc = new AdjustedWidgetLayout(
            w.widget.id,
            w.widget.type,
            w.widget.layout,
          );
          return new HideInfo(awc, w.screenSize, w.hide);
        });
        const res = await hideWidgets(mapped);
        return res;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update hiding status of widget layouts",
        });
      }
    }),
});
