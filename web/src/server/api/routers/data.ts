import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getConfigRepository } from "~/server/domain/config/repo/configRepository";
import widgetConfigToWidgetData from "~/server/domain/config/services/transform.service";

export const dataRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      const storedConfigs = await (await getConfigRepository()).getAll();
      const configData = await widgetConfigToWidgetData(storedConfigs);
      return configData;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget config",
      });
    }
  }),
  getDataForWidget: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await (await getConfigRepository()).get(input.id);
        if (!data) {
          throw new AppError(codes.WIDGET_CONFIG_ADJUSTED_MISSING);
        }
        const configData = await widgetConfigToWidgetData([data]);
        return configData[0]!;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get widget data",
        });
      }
    }),
});
