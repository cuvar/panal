import { TRPCError } from "@trpc/server";
import { z } from "zod";
import updateWidgetLayoutService from "~/application/layout/updateWidgetLayout.service";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { WidgetTypeHelper } from "~/server/domain/config/widgetType";
import {
  type AdjustedWidgetLayout,
  AdjustedWidgetLayoutHelper,
} from "~/server/domain/layout/adjustedWidgetLayout";
import { getLayoutRepository } from "~/server/domain/layout/repo/layoutRepository";
import { uwlToAwl } from "~/server/domain/layout/services/transform.service";
import { widgetLayoutSchema } from "~/server/domain/layout/types";
import { ScreenSizeHelper } from "~/server/domain/other/screenSize";
import { isEmptyPositioning } from "~/server/domain/positioning/positioning.service";
import { ScreenSizePositioningHelper } from "~/server/domain/positioning/screensizePositioning";

export const layoutRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      const storedLayouts = await (await getLayoutRepository()).getAll();
      const layoutData = uwlToAwl(storedLayouts);
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
        const data = await (await getLayoutRepository()).get(input.id);
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
        await (await getLayoutRepository()).setAll(updatedWidgets);
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
        type: WidgetTypeHelper.getSchema(),
        layout: ScreenSizePositioningHelper.getSchema(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await (await getLayoutRepository()).set(input.id, input);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
  getAllHidden: protectedProcedure
    .input(z.object({ screenSize: ScreenSizeHelper.getSchema() }))
    .query(async ({ input }) => {
      try {
        const storedLayouts = await (await getLayoutRepository()).getAll();
        const layoutData = uwlToAwl(storedLayouts);
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
