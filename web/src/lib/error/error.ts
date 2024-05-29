import { type ErrorCodes } from "./codes";

export default class AppError extends Error {
  code: ErrorCodes[];
  constructor(code: ErrorCodes, error?: unknown) {
    super(code);

    if (error instanceof AppError) {
      this.code = error.code;
    } else {
      this.code = [];
    }
    this.code.push(code);
  }
}
