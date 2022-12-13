export class InvalidThirdPartyDeepLinkConnectionError extends Error {
  constructor(message: string = '') {
    super(message);

    // built-in type
    Object.setPrototypeOf(this, InvalidThirdPartyDeepLinkConnectionError.prototype);
  }
}
