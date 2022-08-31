/**
 * KeyChain error type
 */
export class InvalidPasswordError extends Error {
  constructor(message: string = 'Invalid password!') {
    super(message);

    // built-in type
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
