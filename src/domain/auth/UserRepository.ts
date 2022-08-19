import appconfig from '@@config/appconfig';
import { request } from '@@utils/request';

import {
  ClutchUserResponseDto,
  RestoreAccountDto,
  SignupCheckDto,
  SignupCheckResponseDto,
  SignupDto,
  SimpleResponseDto,
} from '../../generated/generated-scheme';

export default class UserRepository {
  private readonly authConfig = appconfig().auth;

  async signUp(body: SignupDto): Promise<ClutchUserResponseDto> {
    try {
      const endpoint = '/v1/accounts';
      const basicCredential = `${this.authConfig.basic.username}:${this.authConfig.basic.password}`;
      const encoded = new Buffer(basicCredential, 'utf8').toString('base64');
      const res = await request.post(endpoint, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
        data: body,
      });
      if ([200, 201].includes(res.status)) {
        return res.data;
      } else {
        console.log(res);
        throw new Error('sign up failed');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  checkAccount(body: SignupCheckDto): SignupCheckResponseDto {
    throw new Error('TODO: checkAccount');
  }

  async restoreAccount(body: RestoreAccountDto): Promise<SimpleResponseDto> {
    try {
      const endpoint = '/v1/accounts/restore';
      const res = await request.post(endpoint, {
        data: body,
      });
      if ([200, 201].includes(res.status)) {
        return res.data;
      } else {
        throw new Error('restore account failed');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
