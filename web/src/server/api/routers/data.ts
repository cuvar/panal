import { TRPCError } from "@trpc/server";
import { z } from "zod";
import AppError from "~/lib/error/error";
import Log from "~/lib/log/log";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getConfigRepository } from "~/server/domain/config/repo/configRepository";
import transformWidgetConfig from "~/server/domain/config/services/transformWidgetConfigService";

export const dataRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      const storedConfigs = await getConfigRepository().getAll();
      const configData = await transformWidgetConfig(storedConfigs);
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
        const data = await getConfigRepository().get(input.id);
        if (!data) {
          throw new AppError(
            `No adjusted widget config for widget with ID ${input.id}`,
          );
        }
        const configData = await transformWidgetConfig([data]);
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
