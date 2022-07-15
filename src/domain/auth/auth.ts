export interface Auth {
  // best effort to get private key
  signIn(): Promise<string>;
}

export class AuthImpl implements Auth {
  signIn(): Promise<string> {
    return Promise.resolve('9c6927dfd60585c8910a36485f59960d2e112bd0a1ad5702a9a2deccbcc465b3');
  }
}
