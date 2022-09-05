/**
 * API error type
 */
export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    // built-in type
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
