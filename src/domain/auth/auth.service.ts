import { ShareStore } from '@tkey/common-types';

import SecureKeychain, { SECURE_TYPES } from '../../utils/SecureKeychain';

import IAuthService, { AuthProvider } from './auth.interface';
import ShareRepository from './share.repository';
import TkeyRepository from './tkey.repository';

export class CustomAuthImpl implements IAuthService {
  async signIn(provider: AuthProvider, requirePassword: () => Promise<string>): Promise<string> {
    try {
      let postboxKey: string;
      let providerIdToken: string;

      const deviceShare = await ShareRepository.fetchDeviceShare();
      if (deviceShare !== undefined) {
        postboxKey = deviceShare.postboxKey;
        providerIdToken = deviceShare.idToken;
      } else {
        const authResult = await TkeyRepository.triggerProviderLogin(provider);
        postboxKey = authResult.postboxKey;
        providerIdToken = authResult.providerIdToken;

        const pw = await requirePassword();
        await SecureKeychain.setGenericPassword(pw, SECURE_TYPES.REMEMBER_ME);
      }

      const tKey = await TkeyRepository.initTkey(postboxKey);

      let inputShare: ShareStore | undefined;

      if (deviceShare !== undefined) {
        inputShare = deviceShare.share;
      } else {
        inputShare = await ShareRepository.findServerShare(tKey, provider, providerIdToken);
      }

      if (inputShare === undefined) {
        throw new Error('no share');
      }
      tKey.inputShareStore(inputShare);

      const res = await tKey.reconstructKey();

      if (deviceShare === undefined) {
        const fetchedDeviceShareIndex = 'a1cccea6ab20e891f2024383dd54eaf31565090de70865283be4ffb5f12e8708';
        const restoredDeviceShare = await tKey.outputShareStore(fetchedDeviceShareIndex);
        await ShareRepository.saveDeviceShare(postboxKey, restoredDeviceShare, providerIdToken, requirePassword);
      }
      console.log(`reconstructed: ${res}`, res);

      return res.privKey.toString('hex').padStart(64, '0');
    } catch (error) {
      console.error(error, 'login caught');
    }
    return '';
  }
}
