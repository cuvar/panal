import { generateUniqueID } from "~/lib/service/widget.service";
import { WidgetConfig } from "~/server/domain/config/widgetConfig";
import { type ConfigRepository } from "./configRepository";

export class ConfigRepositoryMock implements ConfigRepository {
  wc = new WidgetConfig(generateUniqueID(), "time", {});

  async get(): Promise<WidgetConfig> {
    return Promise.resolve(this.wc);
  }

  async getAll(): Promise<WidgetConfig[]> {
    return Promise.resolve([this.wc]);
  }

  async set(id: string, data: WidgetConfig): Promise<void> {
    //
  }

  async setAll(data: WidgetConfig[]): Promise<void> {
    //
  }
}
