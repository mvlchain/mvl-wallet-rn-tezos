export class ThirdPartyAlreadyConnectedError extends Error {
  constructor(message: string = '') {
    super(message);

    // built-in type
    Object.setPrototypeOf(this, ThirdPartyAlreadyConnectedError.prototype);
  }
}
