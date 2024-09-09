import mongoose from "mongoose";
import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type Database } from "./database";

export default class MongoDatabase implements Database {
  static #instance: MongoDatabase;
  private _connection: mongoose.Connection;

  private constructor() {
    if (!env.DATABASE_URL) {
      throw new AppError(codes.DATABASE_MISSING_URL);
    }
    this._connection = mongoose.createConnection(env.DATABASE_URL);
  }

  public static get instance(): Database {
    if (!MongoDatabase.#instance) {
      MongoDatabase.#instance = new MongoDatabase();
    }

    return MongoDatabase.#instance;
  }

  getConnection(): mongoose.Connection {
    return this._connection;
  }
}
