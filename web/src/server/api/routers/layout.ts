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
import {
  type AdjustedWidgetLayout,
  AdjustedWidgetLayoutHelper,
} from "~/server/domain/layout/adjustedWidgetLayout";
import { getLayoutRepository } from "~/server/domain/layout/repo/layoutRepository";
import transformWidgetLayout from "~/server/domain/layout/services/transformWidgetLayout.service";
import updateWidgetLayoutService from "~/server/domain/layout/services/updateWidgetLayout.service";

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
        awLayout: z.array(AdjustedWidgetLayoutHelper.getSchema()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const widgetLayout = input.awLayout.map((w) => {
          return {
            id: w.id,
            type: w.type,
            layout: w.layout,
          } as AdjustedWidgetLayout;
        });
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
      try {
        await getLayoutRepository().set(input.id, input);
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
});
