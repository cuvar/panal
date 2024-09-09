import { generateUniqueID } from "~/application/widget.service";
import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { type IConfigRepository } from "./configRepository";

export class ConfigRepositoryMock implements IConfigRepository {
  wc = { id: generateUniqueID(), type: "time", data: {} } as WidgetConfig;

  async init() {
    // not needed
  }

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
