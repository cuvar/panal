export interface Reader {
  read(file: string): Promise<string>;
  write(file: string, contents: string): Promise<void>;
}
