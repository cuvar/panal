import type { Reader } from "./Reader";

export class MockFileReader implements Reader {
  async read(file: string): Promise<string> {
    return Promise.resolve(file);
  }
  async write(_file: string, _contents: string): Promise<void> {
    return Promise.resolve();
  }
}
