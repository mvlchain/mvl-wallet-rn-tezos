/**
 * KeyChain error type
 */
export class NoCredentialFoundError extends Error {
  constructor(message: string = 'Credential not found!') {
    super(message);

    // built-in type
    Object.setPrototypeOf(this, NoCredentialFoundError.prototype);
  }
}
