import type mongoose from "mongoose";
import MongoDatabase from "./mongodb";

type IConnection = mongoose.Connection;

export interface Database {
  getConnection(): IConnection;
}
/**
 * Gets connection of current database provider
 * @returns {IConnection} connection
 */
export function getDatabaseConnection(): IConnection {
  return MongoDatabase.instance.getConnection();
}
