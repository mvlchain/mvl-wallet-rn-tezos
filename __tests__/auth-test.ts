import { Auth, AuthImpl } from '../src/domain/auth/auth';

const auth: Auth = new AuthImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
