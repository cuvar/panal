import { type ErrorCodes } from "./codes";

export default class AppError extends Error {
  code: ErrorCodes;
  constructor(code: ErrorCodes, error?: unknown) {
    super(code);

    if (error instanceof AppError) {
      this.message = code + ",\n" + error.code;
    } else {
      this.message = code;
    }
    this.code = code;
  }
}
