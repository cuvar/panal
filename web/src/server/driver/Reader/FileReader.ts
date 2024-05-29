import fs from "fs/promises";
import AppError from "~/lib/error/error";
import type { Reader } from "./Reader";

export class FileReader implements Reader {
  async read(file: string): Promise<string> {
    try {
      const fileContents = await fs.readFile(file);
      return fileContents.toString();
    } catch (error) {
      throw new AppError(
        "Cannot set widget config through local file",
        error,
        true,
      );
    }
  }
  async write(file: string, contents: string): Promise<void> {
    try {
      await fs.writeFile(file, contents);
    } catch (error) {
      throw new AppError(
        "Cannot set widget config through local file",
        error,
        true,
      );
    }
  }
}
