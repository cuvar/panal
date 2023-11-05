import { WidgetConfig } from "~/server/entities/widgetConfig";
import { generateUniqueID } from "~/utils/helper";
import { type ConfigRepository } from "./configRepository";

export class ConfigRepositoryMock implements ConfigRepository {
  async get(): Promise<WidgetConfig> {
    return Promise.resolve(new WidgetConfig(generateUniqueID(), "time", {}));
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    //
  }
}
