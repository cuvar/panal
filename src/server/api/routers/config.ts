import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getConfigRepository } from "~/server/domain/config/repo/configRepository";
import { parseWidgetConfigArray } from "~/server/domain/config/services/parseWidgetConfigService";
import { WidgetConfig } from "~/server/domain/config/widgetConfig";
import AppError from "~/utils/error";
import Log from "~/utils/log";
import { widgetTypeSchema } from "~/utils/schema";

export const configRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      const configData = await getConfigRepository().getAll();
      return configData;
    } catch (error) {
      Log(error, "error");
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get widget config",
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
        return data;
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to get widget config",
        });
      }
    }),
  setAll: protectedProcedure
    .input(
      z.object({
        widgets: z.array(z.any()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const parsed = parseWidgetConfigArray(JSON.stringify(input.widgets));
        if (parsed === null) {
          throw new AppError("Cannot parse widget config");
        }

        await getConfigRepository().setAll(parsed);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
  setForWidget: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: widgetTypeSchema,
        data: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const widget = {
        id: input.id,
        type: input.type,
        data: JSON.parse(input.data),
      };

      try {
        if (!WidgetConfig.validate(widget)) {
          throw new AppError(`Cannot parse widget config`);
        }
        await getConfigRepository().set(input.id, widget);
      } catch (error) {
        Log(error, "error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to update widget config",
        });
      }
    }),
});
