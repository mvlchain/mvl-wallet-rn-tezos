import { ShareStore } from '@tkey/common-types';
import { ShareStoreMap } from '@tkey/common-types/src/base/ShareStore';
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
import qs from 'qs';

import { request } from '../../utils/request';

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
  private static async fetchServerShare(provider: 'GOOGLE' | 'APPLE', idToken: string, polynomialId: string): Promise<ShareStore | null> {
    try {
      const endpoint = `/v1/accounts/ss?${qs.stringify({
        provider: provider,
        idtoken: idToken,
        polynomialId: polynomialId,
      })}`;
      console.log(endpoint);
      const res = await request.get(endpoint);
      console.log(res);
      return ShareStore.fromJSON(JSON.parse(res.data.jsonString));
    } catch (e) {
      return null;
    }
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

      const serviceProvider = serviceProviderWithPostboxKey(postboxKey);

      const tKey = new ThresholdKey({
        serviceProvider,
        storageLayer: storageLayer,
        modules: {
          [PRIVATE_KEY_MODULE_NAME]: privateKeyModule,
          [SEED_PHRASE_MODULE_NAME]: seedPhraseModule,
        },
      });
      await tKey.initialize({ neverInitializeNewKey: true });
      console.log(tKey);

      let inputShare: ShareStore | null = null;
      for (const polyId in tKey.metadata.publicPolynomials) {
        const shareStoreMap: ShareStoreMap | undefined = tKey.shares[polyId];
        if (shareStoreMap === undefined) {
          continue;
        }
        const torusShare: ShareStore | undefined = shareStoreMap['1'];
        if (torusShare === undefined) {
          continue;
        }
        const serverShare = await CustomAuthImpl.fetchServerShare('GOOGLE', credentials.userInfo.idToken, torusShare.polynomialID);
        if (serverShare !== null) {
          inputShare = serverShare;
          break;
        }
      }
      if (inputShare === null) {
        throw new Error('no server share');
      }
      tKey.inputShareStore(inputShare);
      console.log(inputShare);

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
