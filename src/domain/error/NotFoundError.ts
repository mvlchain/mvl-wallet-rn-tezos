/**
 * API error type
 */
export class NotFoundError extends Error {
  constructor(message: string = 'Not Found') {
    super(message);
    // built-in type
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
