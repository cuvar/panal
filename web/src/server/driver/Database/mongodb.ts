import { ObjectId } from "mongodb";
import mongoose, { model, Schema } from "mongoose";
import { env } from "~/env.mjs";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import { type Positioning } from "~/server/domain/positioning/positioning";

export default class MongoDatabase {
  static #instance: MongoDatabase;

  public static get instance(): MongoDatabase {
    if (!MongoDatabase.#instance) {
      MongoDatabase.#instance = new MongoDatabase();
    }

    return MongoDatabase.#instance;
  }

  async initialize() {
    if (!env.DATABASE_URL) {
      throw new AppError(codes.DATABASE_MISSING_URL);
    }
    await mongoose.connect(env.DATABASE_URL);
  }
}

/**
 *
 */

export const BoundsMongodbSchema = new Schema<Positioning>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  w: { type: Number, required: true },
  h: { type: Number, required: true },
});

export const LayoutMongodbSchema = new Schema({
  xl: { type: BoundsMongodbSchema, required: true },
  lg: { type: BoundsMongodbSchema, required: true },
  md: { type: BoundsMongodbSchema, required: true },
  sm: { type: BoundsMongodbSchema, required: true },
  xs: { type: BoundsMongodbSchema, required: true },
  xss: { type: BoundsMongodbSchema, required: true },
});

export const TypeMongodbEnum = ["calendar", "search", "links", "time"];

export const UserMongodbSchema = new Schema({
  id: ObjectId,
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export const WidgetMongoSchema = new Schema({
  id: ObjectId,
  type: { type: String, enum: TypeMongodbEnum },
  user: { type: UserMongodbSchema, required: true },
  config: Object,
  layout: { type: LayoutMongodbSchema, required: true },
});

export const UserModelMongodb = model("User", UserMongodbSchema);
export const WidgetModelMongodb = model("Widget", WidgetMongoSchema);
