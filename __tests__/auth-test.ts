import IAuthService from '@@domain/auth/auth.interface';
import { CustomAuthImpl } from '@@domain/auth/auth.service';

const auth: IAuthService = new CustomAuthImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
