import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type WidgetConfig } from "~/server/domain/config/widgetConfig";
import { FileReader } from "~/server/driver/Reader/FileReader";
import { ConfigLocalFileRepository } from "./configLocalFileRepository";
import { ConfigMongoRepository } from "./configMongoRepository";
import { ConfigRepositoryMock } from "./configRepositoryMock";
import { ConfigUpstashRepository } from "./configUpstashRepository";

export interface IConfigRepository {
  get(id: string): Promise<WidgetConfig>;
  getAll(): Promise<WidgetConfig[]>;
  set(id: string, data: WidgetConfig): Promise<void>;
  setAll(data: WidgetConfig[]): Promise<void>;
  init(): Promise<void>;
}

export default class ConfigRepository {
  static #instance: ConfigRepository;
  private _adapter: IConfigRepository;
  private _hasBeenInitialized: boolean;

  private constructor() {
    let repo: IConfigRepository | null = null;
    if (env.WIDGET_STORE == "upstash") {
      repo = new ConfigUpstashRepository();
    } else if (env.WIDGET_STORE == "mongodb") {
      repo = new ConfigMongoRepository();
    } else if (env.WIDGET_STORE == "file") {
      repo = new ConfigLocalFileRepository(new FileReader());
    } else if (env.WIDGET_STORE == "mock") {
      repo = new ConfigRepositoryMock();
    }

    if (!repo) {
      throw new AppError(codes.REPOSITORY_MISSING, null);
    }

    this._adapter = repo;
    this._hasBeenInitialized = false;
  }

  public static get instance(): ConfigRepository {
    if (!ConfigRepository.#instance) {
      ConfigRepository.#instance = new ConfigRepository();
    }

    return ConfigRepository.#instance;
  }

  async getAdapter(): Promise<IConfigRepository> {
    if (!this._hasBeenInitialized) {
      await this._adapter.init();
      this._hasBeenInitialized = true;
    }
    return this._adapter;
  }
}

/**
 * Gets the widget repository
 * @returns {ConfigRepository} Widget repository
 */
export function getConfigRepository(): Promise<IConfigRepository> {
  return ConfigRepository.instance.getAdapter();
}
