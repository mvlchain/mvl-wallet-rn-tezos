import { Auth, TkeyAuthImpl } from '../src/domain/auth/auth';

const auth: Auth = new TkeyAuthImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
