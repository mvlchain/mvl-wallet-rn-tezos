import { components } from '../../generated/generated-scheme';

type SignupDto = components['schemas']['SignupDto'];
type ClutchUserResponseDto = components['schemas']['ClutchUserResponseDto'];

type SignupCheckDto = components['schemas']['SignupCheckDto'];
type SignupCheckResponseDto = components['schemas']['SignupCheckResponseDto'];

export default class UserRepository {
  signUp(body: SignupDto): ClutchUserResponseDto {
    throw new Error('TODO: signUp');
  }
  checkAccount(body: SignupCheckDto): SignupCheckResponseDto {
    throw new Error('TODO: checkAccount');
  }
}
