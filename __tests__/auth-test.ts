import { Auth, CustomAuthImpl } from '../src/domain/auth/auth';

const auth: Auth = new CustomAuthImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
