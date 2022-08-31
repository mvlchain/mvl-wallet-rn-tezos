/**
 * KeyChain error type
 */
export class InvalidCredentialError extends Error {
  constructor(message: string = 'Invalid key credential!') {
    super(message);

    // built-in type
    Object.setPrototypeOf(this, InvalidCredentialError.prototype);
  }
}
