import ThresholdKey from '@tkey/core';
import PrivateKeyModule, { SECP256k1Format, PRIVATE_KEY_MODULE_NAME } from '@tkey/private-keys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat, SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase';
import ServiceProviderBase from '@tkey/service-provider-base';
import TorusStorageLayer from '@tkey/storage-layer-torus';
import { TorusLoginResponse, LOGIN, LOGIN_TYPE } from '@toruslabs/customauth';
// @ts-ignore
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import { TorusAggregateLoginResponse } from '@toruslabs/customauth/src/handlers/interfaces';
import BN from 'bn.js';

import appconfig from '@@config/appconfig';

import { AUTH_PROVIDER, AuthProvider } from './IAuthService';

export default class TkeyRepository {
  private readonly authConfig = appconfig().auth;

  static serviceProviderWithPostboxKey(postboxKey: string) {
    const enableLogging = process.env.ENABLE_TORUS_LOGGING === 'true';
    return new ServiceProviderBase({ enableLogging, postboxKey });
  }

  private static authProviderToTypeOfLogin(provider: AuthProvider): LOGIN_TYPE {
    switch (provider) {
      case AUTH_PROVIDER.GOOGLE:
        return LOGIN.GOOGLE;
      case AUTH_PROVIDER.APPLE:
        return LOGIN.APPLE;
    }
  }

  static async initTkey(postboxKey: string, onlySignIn: boolean): Promise<ThresholdKey> {
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
    await tKey.initialize({ neverInitializeNewKey: onlySignIn });
    return tKey;
  }

  async triggerProviderLogin(provider: AuthProvider): Promise<{ postboxKey: string; providerIdToken?: string; providerAccessToken?: string }> {
    console.log('triggerProviderLogin calls CustomAuth.init');
    const network = this.authConfig.web3Auth.network;
    await CustomAuth.init({
      network,
      nativeNetwork: this.authConfig.web3Auth.nativeNetwork,
      redirectUri: this.authConfig.authRedirectUrl,
      browserRedirectUri: this.authConfig.browserRedirectUrl,
      enableLogging: false,
    });
    if (provider === AUTH_PROVIDER.GOOGLE) {
      console.log('triggerProviderLogin calls CustomAuth.triggerLogin');
      const verifier = this.authConfig.web3Auth.verifier[provider];
      const credentials: TorusLoginResponse = await CustomAuth.triggerLogin({
        name: 'Clutch',
        typeOfLogin: TkeyRepository.authProviderToTypeOfLogin(provider),
        clientId: this.authConfig.googleClientId,
        verifier: verifier,
      });
      return {
        postboxKey: credentials.privateKey,
        providerIdToken: credentials.userInfo.idToken,
        providerAccessToken: credentials.userInfo.accessToken,
      };
    } else {
      console.log('triggerProviderLogin calls CustomAuth.triggerAggregateLogin');
      const verifier = this.authConfig.web3Auth.verifier[provider];

      CustomAuth.getTorusKey();

      const credentials: TorusAggregateLoginResponse = await CustomAuth.triggerAggregateLogin({
        aggregateVerifierType: 'single_login',
        verifierIdentifier: verifier,
        subVerifierDetailsArray: [],
      });
      const userInfo = credentials.userInfo[0];
      return {
        postboxKey: credentials.privateKey,
        providerIdToken: userInfo.idToken,
        providerAccessToken: userInfo.accessToken,
      };
    }
  }

  static async checkSignedUp(postboxKey: string): Promise<boolean> {
    const tKey = new ThresholdKey({
      serviceProvider: TkeyRepository.serviceProviderWithPostboxKey(postboxKey),
      storageLayer: new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us' }),
    });

    const shareStore: any = await tKey.storageLayer.getMetadata({ privKey: new BN(postboxKey, 'hex') });
    const isNewKey = shareStore.message === 'KEY_NOT_FOUND';
    return !isNewKey;
  }
}
