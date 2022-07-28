import IAuthService from '../src/domain/auth/auth.interface';
import { CustomAuthImpl } from '../src/domain/auth/auth.service';

const auth: IAuthService = new CustomAuthImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
