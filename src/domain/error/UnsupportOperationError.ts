/**
 * API error type
 */
export class UnsupportOperationError extends Error {
  constructor(message: string = '') {
    super(message);
    // built-in type
    Object.setPrototypeOf(this, UnsupportOperationError.prototype);
  }
}
