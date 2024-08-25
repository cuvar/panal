import { generateUniqueID } from "~/lib/service/widget.service";
import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { type ConfigRepository } from "./configRepository";

export class ConfigRepositoryMock implements ConfigRepository {
  wc = { id: generateUniqueID(), type: "time", data: {} } as WidgetConfig;

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
