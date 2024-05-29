import fs from "fs/promises";
import { codes } from "~/lib/error/codes";
import AppError from "~/lib/error/error";
import type { Reader } from "./Reader";

export class FileReader implements Reader {
  async read(file: string): Promise<string> {
    try {
      const fileContents = await fs.readFile(file);
      return fileContents.toString();
    } catch (error) {
      throw new AppError(codes.IO_READ_FAILED, error);
    }
  }
  async write(file: string, contents: string): Promise<void> {
    try {
      await fs.writeFile(file, contents);
    } catch (error) {
      throw new AppError(codes.IO_WRITE_FAILED, error);
    }
  }
}
