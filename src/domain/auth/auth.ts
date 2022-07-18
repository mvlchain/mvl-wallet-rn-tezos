import { ShareStore } from '@tkey/common-types';
import ThresholdKey from '@tkey/core';
import PrivateKeyModule, { SECP256k1Format } from '@tkey/private-keys';
import { PRIVATE_KEY_MODULE_NAME } from '@tkey/private-keys/src/PrivateKeys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat } from '@tkey/seed-phrase';
import { SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase/src/SeedPhrase';
import ServiceProviderBase from '@tkey/service-provider-base';
import TorusServiceProvider from '@tkey/service-provider-torus';
import TorusStorageLayer from '@tkey/storage-layer-torus';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import BN from 'bn.js';

// const serviceProviderWithPostboxKey = (enableLoggin: boolean, postboxKey: string) => {
//   return new ServiceProviderBase({ enableLogging, postboxKey })
// }

export interface Auth {
  // best effort to get private key
  signIn(): Promise<string>;
}

const scheme = 'clutchwallet'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://***REMOVED***/redirect`;

export class Web3AuthImpl implements Auth {
  async signIn(): Promise<string> {
    const web3auth = new Web3Auth(WebBrowser, {
      clientId: 'BHtkl316SIVJuuFmmWlrHPb6MztS9JRcN_iKXmQuCnWZGGiYBGbSKd_ZfziAIidGarYorDACGSOBCJtF5ZMyrII',
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      redirectUrl: resolvedRedirectUrl,

      whiteLabel: {
        name: 'Clutch',
        defaultLanguage: 'en', // or other language
        dark: true, // or false,
        theme: {},
      },

      loginConfig: {
        google: {
          name: 'Clutch',
          verifier: '***REMOVED***',
          typeOfLogin: 'google',
          clientId: '***REMOVED***',
        },
      },
    });

    const state = await web3auth.login({
      loginProvider: LOGIN_PROVIDER.GOOGLE,
      redirectUrl: resolvedRedirectUrl,

      // extraLoginOptions: {
      //   domain: 'any_nonempty_string',
      //   verifierIdField: 'sub',
      //   id_token: 'JWT_TOKEN',
      // },
      dappShare:
        // eslint-disable-next-line max-len
        'coconut goddess giraffe feed river photo wife shrug hard nephew shoot lounge hundred trouble album veteran couple health decrease lecture six blame daughter spin',
    });

    return Promise.resolve(state.privKey ?? '');
  }
}

export class TkeyAuthImpl implements Auth {
  private privateKeyModule = new PrivateKeyModule([new SECP256k1Format(new BN(0))]);
  private seedPhraseModule = new SeedPhraseModule([new MetamaskSeedPhraseFormat('https://mainnet.infura.io/v3/bca735fdbba0408bb09471e86463ae68')]);

  private storageLayer = new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us' });

  private serviceProvider = new TorusServiceProvider({
    directParams: {
      enableLogging: true,
      baseUrl: '***REMOVED***',
      network: 'testnet',
      networkUrl: 'https://ropsten.infura.io/v3/***REMOVED***',
      redirectPathName: 'customauth_redirect.html',
      redirectToOpener: true,
      uxMode: 'redirect',
      locationReplaceOnRedirect: true,
    },
  });

  private async fetchServerShare(): Promise<ShareStore> {
    return ShareStore.fromJSON({
      share: {
        share: '2cec8588aa5bad477ebe3a69328b1a4226f3d2017f99312d44e4bf8c9c2e4df6',
        shareIndex: 'd0b4f68a80494ef651ce09629406f0af25e25301d262807a2f50ac6b5f580943',
      },
      polynomialID:
        '039a3f34da6780ed048d871e876db4fd5a3f6e85e3330dae0932be5713a73e4ebb|024dc508b004f7b61e3926d9da2d74f66953835c6708dcbba961a48eeb0af746b8',
    });
  }

  async signIn(): Promise<string> {
    const tKey = new ThresholdKey({
      serviceProvider: this.serviceProvider,
      storageLayer: this.storageLayer,
      modules: {
        [PRIVATE_KEY_MODULE_NAME]: this.privateKeyModule,
        [SEED_PHRASE_MODULE_NAME]: this.seedPhraseModule,
      },
    });

    const torusServiceProvider = tKey.serviceProvider as TorusServiceProvider;
    await torusServiceProvider.init({ skipSw: true, skipPrefetch: true });

    const loginResponse = await torusServiceProvider.triggerLogin({
      typeOfLogin: 'google',
      verifier: '***REMOVED***',
      clientId: '***REMOVED***',
    });
    // const postboxKey = loginResponse.privateKey;
    // console.log(`postboxKey: ${postboxKey}`);
    //
    // const serverShare = await this.fetchServerShare();
    // tKey.inputShareStore(serverShare);
    //
    // await tKey.initialize({ neverInitializeNewKey: true });
    // const res = await tKey.reconstructKey();
    //
    // console.log(res);
    //
    // return res.privKey.toString('hex').padStart(64, '0');
    return '';
  }
}
