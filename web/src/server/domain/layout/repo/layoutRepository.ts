import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { FileReader } from "../../../driver/Reader/FileReader";
import type { AdjustedWidgetLayout } from "../adjustedWidgetLayout";
import { LayoutLocalFileRepository } from "./layoutLocalFileRepository";
import { LayoutMongoRepository } from "./layoutMongoRepository";
import { LayoutRepositoryMock } from "./layoutRepositoryMock";
import { LayoutUpstashRepository } from "./layoutUpstashRepository";

export interface ILayoutRepository {
  get(id: string): Promise<AdjustedWidgetLayout>;
  getAll(): Promise<AdjustedWidgetLayout[]>;
  setAll(widgets: AdjustedWidgetLayout[]): Promise<void>;
  set(id: string, widget: AdjustedWidgetLayout): Promise<void>;
  init(): Promise<void>;
}

export default class LayoutRepository {
  static #instance: LayoutRepository;
  private _adapter: ILayoutRepository;
  private _hasBeenInitialized: boolean;

  private constructor() {
    let repo: ILayoutRepository | null = null;
    if (env.WIDGET_STORE == "upstash") {
      repo = new LayoutUpstashRepository();
    } else if (env.WIDGET_STORE == "mongodb") {
      repo = new LayoutMongoRepository();
    } else if (env.WIDGET_STORE == "file") {
      repo = new LayoutLocalFileRepository(new FileReader());
    } else if (env.WIDGET_STORE == "mock") {
      repo = new LayoutRepositoryMock();
    }

    if (!repo) {
      throw new AppError(codes.REPOSITORY_MISSING, null);
    }

    this._adapter = repo;
    this._hasBeenInitialized = false;
  }

  public static get instance(): LayoutRepository {
    if (!LayoutRepository.#instance) {
      LayoutRepository.#instance = new LayoutRepository();
    }

    return LayoutRepository.#instance;
  }

  async getAdapter(): Promise<ILayoutRepository> {
    if (!this._hasBeenInitialized) {
      await this._adapter.init();
      this._hasBeenInitialized = true;
    }
    return this._adapter;
  }
}

/**
 * Gets the widget repository
 * @returns {LayoutRepository} Widget repository
 */
export function getLayoutRepository(): Promise<ILayoutRepository> {
  return LayoutRepository.instance.getAdapter();
}
