import { ShareStore } from '@tkey/common-types';
import ThresholdKey from '@tkey/core';
import PrivateKeyModule, { SECP256k1Format } from '@tkey/private-keys';
import { PRIVATE_KEY_MODULE_NAME } from '@tkey/private-keys/src/PrivateKeys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat } from '@tkey/seed-phrase';
import { SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase/src/SeedPhrase';
import ServiceProviderBase from '@tkey/service-provider-base';
import TorusStorageLayer from '@tkey/storage-layer-torus';
// @ts-ignore
import CustomAuth from '@toruslabs/customauth-react-native-sdk';
import BN from 'bn.js';

const enableLogging = process.env.ENABLE_TORUS_LOGGING === 'true';

const serviceProviderWithPostboxKey = ((enableLogging: boolean) => (postboxKey: string) => {
  return new ServiceProviderBase({ enableLogging, postboxKey: new BN(postboxKey, 'hex').toString('hex') });
})(enableLogging);

export interface Auth {
  // best effort to get private key
  signIn(): Promise<string>;
}

const scheme = 'clutchwallet'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://***REMOVED***/redirect`;
const browserRedirectUri = '***REMOVED***';
const googleClientId = '***REMOVED***';
const verifier = '***REMOVED***';

const privateKeyModule = new PrivateKeyModule([new SECP256k1Format(new BN(0))]);
const seedPhraseModule = new SeedPhraseModule([new MetamaskSeedPhraseFormat('https://mainnet.infura.io/v3/bca735fdbba0408bb09471e86463ae68')]);

const storageLayer = new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us' });

export class CustomAuthImpl implements Auth {
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

  private async fetchDeviceShare(): Promise<ShareStore> {
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
    CustomAuth.init({
      network: 'testnet',
      redirectUri: resolvedRedirectUrl,
      browserRedirectUri,
      enableLogging: false,
    });

    try {
      const credentials = await CustomAuth.triggerLogin({
        name: 'Clutch',
        typeOfLogin: 'google',
        clientId: googleClientId,
        verifier,
      });

      const postboxKey = credentials.privateKey;
      console.log(`postboxKey: ${postboxKey}`);

      const serviceProvider = serviceProviderWithPostboxKey(postboxKey);

      const tKey = new ThresholdKey({
        serviceProvider,
        storageLayer: storageLayer,
        modules: {
          [PRIVATE_KEY_MODULE_NAME]: privateKeyModule,
          [SEED_PHRASE_MODULE_NAME]: seedPhraseModule,
        },
      });
      console.log(tKey);

      const serverShare = await this.fetchServerShare();
      tKey.inputShareStore(serverShare);
      console.log(serverShare);

      await tKey.initialize({ neverInitializeNewKey: true });
      console.log(`tKey.init`);
      const res = await tKey.reconstructKey();
      console.log(`reconstructed: ${res}`, res);

      return res.privKey.toString('hex').padStart(64, '0');
    } catch (error) {
      console.error(error, 'login caught');
    }
    return '';
  }
}
