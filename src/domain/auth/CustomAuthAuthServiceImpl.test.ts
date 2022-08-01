import { CustomAuthAuthServiceImpl } from '@@domain/auth/CustomAuthAuthServiceImpl';
import IAuthService from '@@domain/auth/IAuthService';

const auth: IAuthService = new CustomAuthAuthServiceImpl();

it('constructs correctly', () => {
  expect(auth).toBeDefined();
});
