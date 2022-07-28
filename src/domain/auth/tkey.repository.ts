import ThresholdKey from '@tkey/core';
import PrivateKeyModule, { SECP256k1Format } from '@tkey/private-keys';
import { PRIVATE_KEY_MODULE_NAME } from '@tkey/private-keys/src/PrivateKeys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat } from '@tkey/seed-phrase';
import { SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase/src/SeedPhrase';
import ServiceProviderBase from '@tkey/service-provider-base';
import TorusStorageLayer from '@tkey/storage-layer-torus';
// @ts-ignore
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { LOGIN, LOGIN_TYPE } from '@toruslabs/customauth/src/utils/enums';
import BN from 'bn.js';

import appconfig from '@@config/appconfig';

import { AUTH_PROVIDER, AuthProvider } from './auth.interface';

export default class TkeyRepository {
  private static readonly authConfig = appconfig().auth;

  private static serviceProviderWithPostboxKey(postboxKey: string) {
    const enableLogging = process.env.ENABLE_TORUS_LOGGING === 'true';
    return new ServiceProviderBase({ enableLogging, postboxKey });
  }

  private static authProviderToTypeOfLogin(provider: AuthProvider): LOGIN_TYPE {
    switch (provider) {
      case AUTH_PROVIDER.GOOGLE:
        return LOGIN.GOOGLE;
      case AUTH_PROVIDER.APPLE:
        return LOGIN.APPLE;
      default:
        throw new Error(`undefined provider: ${provider}`);
    }
  }

  static async initTkey(postboxKey: string): Promise<ThresholdKey> {
    const tKey = new ThresholdKey({
      serviceProvider: this.serviceProviderWithPostboxKey(postboxKey),
      storageLayer: new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us' }),
      modules: {
        [PRIVATE_KEY_MODULE_NAME]: new PrivateKeyModule([new SECP256k1Format(new BN(0))]),
        [SEED_PHRASE_MODULE_NAME]: new SeedPhraseModule([
          new MetamaskSeedPhraseFormat('https://mainnet.infura.io/v3/bca735fdbba0408bb09471e86463ae68'),
        ]),
      },
    });
    await tKey.initialize({ neverInitializeNewKey: true });
    return tKey;
  }

  static async triggerProviderLogin(provider: AuthProvider): Promise<{ postboxKey: string; providerIdToken: string }> {
    await CustomAuth.init({
      network: TkeyRepository.authConfig.web3Auth.network,
      redirectUri: TkeyRepository.authConfig.authRedirectUrl,
      browserRedirectUri: TkeyRepository.authConfig.browserRedirectUrl,
      enableLogging: false,
    });
    const credentials = await CustomAuth.triggerLogin({
      name: 'Clutch',
      typeOfLogin: TkeyRepository.authProviderToTypeOfLogin(provider),
      clientId: TkeyRepository.authConfig.googleClientId,
      verifier: TkeyRepository.authConfig.web3Auth.verifier,
    });
    return { postboxKey: credentials.privateKey, providerIdToken: credentials.userInfo.idToken };
  }
}
