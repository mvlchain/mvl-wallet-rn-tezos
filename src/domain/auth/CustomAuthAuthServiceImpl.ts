/* eslint-disable max-lines */

import { KEY_NOT_FOUND, ShareStore } from '@tkey/common-types';
import ThresholdKey from '@tkey/core';
import PrivateKeyModule, { PRIVATE_KEY_MODULE_NAME, SECP256k1Format } from '@tkey/private-keys';
import SeedPhraseModule, { MetamaskSeedPhraseFormat, SEED_PHRASE_MODULE_NAME } from '@tkey/seed-phrase';
import ServiceProviderBase from '@tkey/service-provider-base';
import TorusStorageLayer from '@tkey/storage-layer-torus';
import { LoginWindowResponse, TorusVerifierResponse } from '@toruslabs/customauth';
import BN from 'bn.js';
import { ethers } from 'ethers';

import { Clutch, extendedKeyPath, keyDerivationPath } from '@@domain/blockchain/Clutch';
import { usePinStore, Mode } from '@@store/pin';

import SecureKeychain, { SECURE_TYPES } from '../../utils/SecureKeychain';
import { ETHEREUM } from '../blockchain/BlockChain';

import IAuthService, { AuthProvider, DeviceShareHolder, RequirePassword } from './IAuthService';
import ShareRepository from './ShareRepository';
import TkeyRepository from './TkeyRepository';
import UserRepository from './UserRepository';

const storageLayer = new TorusStorageLayer({ hostUrl: 'https://metadata.tor.us', enableLogging: false });

const pkeyToMnemonic = (pkey: BN): string => ethers.utils.entropyToMnemonic('0x' + pkey.toString('hex', 64));

type UserInfo = TorusVerifierResponse & LoginWindowResponse;
type RestoreResult = {
  success: boolean;
  postboxKey?: string;
  mnemonic?: string;
  userInfo?: UserInfo;
};

export class CustomAuthAuthServiceImpl implements IAuthService {
  private readonly userRepository = new UserRepository();
  private readonly tkeyRepository = new TkeyRepository();

  private static async whenDeviceShareExists(deviceShare: DeviceShareHolder): Promise<string> {
    const postboxKey: string = deviceShare.postboxKey,
      inputShare: ShareStore = deviceShare.share;
    const tKey = await TkeyRepository.initTkey(postboxKey, true);
    tKey.inputShareStore(inputShare);

    const res = await tKey.reconstructKey();
    return res.privKey.toString('hex', 64);
  }

  private async signUp(
    provider: AuthProvider,
    postboxKey: string,
    password: string,
    providerIdToken: string | undefined,
    providerAccessToken: string | undefined,
    providerUserIdentifier: string | undefined
  ): Promise<string> {
    console.log('signUp started');
    const tKey = await TkeyRepository.initTkey(postboxKey, false);
    CustomAuthAuthServiceImpl.logTKey(tKey);

    console.log('gen serverShare');
    const newShare = await tKey.generateNewShare();
    const serverShare = newShare.newShareStores[newShare.newShareIndex.toString('hex', 64)];
    console.log('update serverShare', serverShare);

    CustomAuthAuthServiceImpl.logTKey(tKey);

    const privateKey = tKey.privKey.toString('hex', 64);
    const pubKey = Clutch.extendedPublicKey(privateKey);

    const identifier = providerUserIdentifier;

    await this.userRepository.signUp({
      type: provider,
      idtoken: providerIdToken,
      accessToken: providerAccessToken,
      identifier,
      share: ShareRepository.shareToShareJson(serverShare),
      pubKey,
    });

    const polyId = serverShare.polynomialID;

    let latestPolyId = tKey.metadata.getLatestPublicPolynomial().polynomialId;
    if (polyId !== latestPolyId) {
      throw new Error(`polyId not matched: ${polyId}, ${latestPolyId}`);
    }
    const shareIndexs = tKey.metadata.getShareIndexesForPolynomial(polyId);
    const usedIndexes = ['1', serverShare.share.shareIndex.toString('hex', 64)];
    const deviceShareIndex = shareIndexs.find((shareIndex) => !usedIndexes.includes(shareIndex));
    if (deviceShareIndex === undefined) {
      throw new Error('deviceShareIndex not identified');
    }
    const deviceShare = await tKey.outputShareStore(deviceShareIndex);
    await ShareRepository.saveDeviceShare(postboxKey, deviceShare, password, providerIdToken, providerAccessToken);

    return tKey.privKey.toString('hex', 64);
  }

  private async whenUserExists(
    provider: AuthProvider,
    postboxKey: string,
    password: string,
    providerIdToken: string | undefined,
    providerAccessToken: string | undefined
  ): Promise<string> {
    const tKey = await TkeyRepository.initTkey(postboxKey, true);
    const serverShareResponse = await ShareRepository.findServerShare(tKey, provider, providerIdToken, providerAccessToken);
    console.log('serverShareResponse', serverShareResponse);
    if (serverShareResponse === undefined) {
      // TODO: go to restore or import screen
      return await this.createNewWallet(postboxKey, password, providerIdToken, providerAccessToken);
      // throw new Error('no share');
    }
    const serverShare = ShareStore.fromJSON(JSON.parse(serverShareResponse.jsonString));
    tKey.inputShareStore(serverShare);

    const res = await tKey.reconstructKey();

    const polyId = serverShareResponse.polynomialId;
    const shareIndexs = tKey.metadata.getShareIndexesForPolynomial(polyId);
    let deviceShare: ShareStore;
    if (shareIndexs.length === 2) {
      // torus, server share already exist. So generate new device share
      const newDeviceShareRes = await tKey.generateNewShare();
      deviceShare = newDeviceShareRes.newShareStores[newDeviceShareRes.newShareIndex.toString('hex', 64)];
    } else if (shareIndexs.length === 3) {
      // '1' index used for torus share
      const usedIndexes = ['1', serverShare.share.shareIndex.toString('hex', 64)];
      const deviceShareIndex = shareIndexs.find((shareIndex) => !usedIndexes.includes(shareIndex));
      if (deviceShareIndex === undefined) {
        throw new Error('deviceShareIndex not identified');
      }
      deviceShare = await tKey.outputShareStore(deviceShareIndex);
    } else {
      throw new Error(`shareIndexes.length err ${shareIndexs.length}`);
    }
    await ShareRepository.saveDeviceShare(postboxKey, deviceShare, password, providerIdToken);

    return res.privKey.toString('hex', 64);
  }

  private async whenDriverShareNotExists(provider: AuthProvider): Promise<string> {
    const authResult = await this.tkeyRepository.triggerProviderLogin(provider);
    const postboxKey = authResult.postboxKey,
      providerIdToken = authResult.providerIdToken,
      providerAccessToken = authResult.providerAccessToken,
      providerUserIdentifier = authResult.providerUserIdentifier;

    const password = await this.requirePassword();
    const signedUp = await TkeyRepository.checkSignedUp(postboxKey);
    if (signedUp) {
      return await this.whenUserExists(provider, postboxKey, password, providerIdToken, providerAccessToken);
    } else {
      return await this.signUp(provider, postboxKey, password, providerIdToken, providerAccessToken, providerUserIdentifier);
    }
  }

  async signIn(provider: AuthProvider): Promise<string> {
    try {
      const deviceShare = await ShareRepository.fetchDeviceShare();
      if (deviceShare !== undefined) {
        return CustomAuthAuthServiceImpl.whenDeviceShareExists(deviceShare);
      } else {
        return this.whenDriverShareNotExists(provider);
      }
    } catch (error) {
      console.error(error, 'login caught');
    }
    return '';
  }

  async logout(): Promise<void> {
    await ShareRepository.clearDeviceShare();
    await ShareRepository.clearRootKey();
  }

  async deleteAccount(): Promise<void> {
    const deviceShare = await ShareRepository.fetchDeviceShare();
    if (deviceShare === undefined) return;

    const postboxKey = deviceShare.postboxKey;

    const tKey = new ThresholdKey({
      serviceProvider: TkeyRepository.serviceProviderWithPostboxKey(postboxKey),
      storageLayer,
    });

    const serviceProvider = tKey.serviceProvider;
    console.log('deleteAccount setMetadataStream');
    await tKey.storageLayer.setMetadataStream({
      input: [{ message: KEY_NOT_FOUND, dateAdded: Date.now() }],
      privKey: [new BN(postboxKey, 'hex')],
      serviceProvider: serviceProvider,
    });
    console.log('deleteAccount setMetadataStream done');

    await ShareRepository.clearDeviceShare();
    // TODO: remove server share
  }

  async test(): Promise<void> {
    const deviceShare = await ShareRepository.fetchDeviceShare();
    if (deviceShare === undefined) return;

    const postboxKey = deviceShare.postboxKey;

    const tKey = new ThresholdKey({
      serviceProvider: TkeyRepository.serviceProviderWithPostboxKey(postboxKey),
      storageLayer,
      modules: {
        [PRIVATE_KEY_MODULE_NAME]: new PrivateKeyModule([new SECP256k1Format(new BN(0))]),
        [SEED_PHRASE_MODULE_NAME]: new SeedPhraseModule([
          new MetamaskSeedPhraseFormat('https://mainnet.infura.io/v3/bca735fdbba0408bb09471e86463ae68'),
        ]),
      },
    });

    await tKey.initialize({ neverInitializeNewKey: true });
    tKey.inputShareStore(deviceShare.share);

    const res = await tKey.reconstructKey();
    CustomAuthAuthServiceImpl.logTKey(tKey);
    console.log(res);
  }

  private static logTKey(tKey: ThresholdKey) {
    console.log(tKey);
    console.log(tKey.metadata);
    console.log(tKey.metadata.publicPolynomials);
    console.log('------------------------------------');
    let polynomialId = tKey.metadata.getLatestPublicPolynomial().polynomialId;
    console.log(polynomialId);
    let shareIndexes = tKey.metadata.getShareIndexesForPolynomial(polynomialId);
    console.log(shareIndexes);
    for (let i = 0; i < shareIndexes.length; i++) {
      const outputShare = tKey.outputShareStore(shareIndexes[i], polynomialId);
      console.log(`outputShare[${shareIndexes[i]}]`, outputShare);
    }
  }

  private async createNewWallet(
    postboxKey: string,
    password: string,
    providerIdToken: string | undefined,
    providerAccessToken: string | undefined
  ): Promise<string> {
    const tKey = new ThresholdKey({
      serviceProvider: TkeyRepository.serviceProviderWithPostboxKey(postboxKey),
      storageLayer,
    });
    await tKey._initializeNewKey({});

    CustomAuthAuthServiceImpl.logTKey(tKey);

    console.log('gen serverShare');
    const newShare = await tKey.generateNewShare();
    const serverShare = newShare.newShareStores[newShare.newShareIndex.toString('hex', 64)];
    console.log('update serverShare', serverShare);

    CustomAuthAuthServiceImpl.logTKey(tKey);

    await ShareRepository.updateServerShare(
      serverShare.share.share.toString('hex', 64),
      serverShare.share.shareIndex.toString('hex', 64),
      serverShare.polynomialID,
      undefined
    );

    const polyId = serverShare.polynomialID;

    let latestPolyId = tKey.metadata.getLatestPublicPolynomial().polynomialId;
    if (polyId !== latestPolyId) {
      throw new Error(`polyId not matched: ${polyId}, ${latestPolyId}`);
    }
    const shareIndexs = tKey.metadata.getShareIndexesForPolynomial(polyId);
    const usedIndexes = ['1', serverShare.share.shareIndex.toString('hex', 64)];
    const deviceShareIndex = shareIndexs.find((shareIndex) => !usedIndexes.includes(shareIndex));

    if (deviceShareIndex === undefined) {
      throw new Error('deviceShareIndex not identified');
    }
    const deviceShare = await tKey.outputShareStore(deviceShareIndex);
    await ShareRepository.saveDeviceShare(postboxKey, deviceShare, password, providerIdToken, providerAccessToken);
    return tKey.privKey.toString('hex', 64);
  }

  async generateNewMnemonic(postboxKey: string, userInfo: UserInfo): Promise<RestoreResult> {
    const serviceProvider = new ServiceProviderBase({ postboxKey });
    const tKey = new ThresholdKey({ serviceProvider, storageLayer, enableLogging: false });

    await tKey._initializeNewKey({});
    const newShare = await tKey.generateNewShare();
    const serverShare = newShare.newShareStores[newShare.newShareIndex.toString('hex', 64)];
    const pkey = await tKey.reconstructKey();
    const extendedKeyPair = Clutch.extendedKeyPair(pkey.privKey.toString('hex', 64), extendedKeyPath(ETHEREUM));
    const wallet0 = Clutch.createWalletWithEntropy(pkey.privKey.toString('hex', 64), keyDerivationPath(ETHEREUM, 0));

    await this.userRepository.restoreAccount({
      type: 'GOOGLE',
      idtoken: userInfo.idToken,
      accessToken: userInfo.accessToken,
      // identifier: when Apple login,
      share: ShareRepository.shareToShareJson(serverShare),
      pubKey: extendedKeyPair.xpub,
      walletAddress0: wallet0.address,
    });
    return {
      success: true,
      mnemonic: pkeyToMnemonic(pkey.privKey),
    };
  }

  async importUserMnemonic(postboxKey: string, mnemonic: string, userInfo: UserInfo): Promise<RestoreResult> {
    const serviceProvider = new ServiceProviderBase({ postboxKey });
    const tkey = new ThresholdKey({ serviceProvider, storageLayer, enableLogging: false });

    await tkey._initializeNewKey({
      importedKey: new BN(ethers.utils.mnemonicToEntropy(mnemonic).slice(2), 'hex'),
    });
    const newShare = await tkey.generateNewShare();
    const serverShare = newShare.newShareStores[newShare.newShareIndex.toString('hex', 64)];
    const pkey = await tkey.reconstructKey();

    const extendedKeyPair = Clutch.extendedKeyPair(pkey.privKey.toString('hex', 64), extendedKeyPath(ETHEREUM));

    const wallet0 = Clutch.createWalletWithEntropy(pkey.privKey.toString('hex', 64), keyDerivationPath(ETHEREUM, 0));

    await this.userRepository.restoreAccount({
      type: 'GOOGLE',
      idtoken: userInfo.idToken,
      accessToken: userInfo.accessToken,
      // identifier: when Apple login,
      share: ShareRepository.shareToShareJson(serverShare),
      pubKey: extendedKeyPair.xpub,
      walletAddress0: wallet0.address,
    });
    return {
      success: true,
      mnemonic: pkeyToMnemonic(pkey.privKey),
    };
  }

  async requirePassword() {
    let pinModalResolver, pinModalRejector;
    const pinModalObserver = new Promise((resolve, reject) => {
      pinModalResolver = resolve;
      pinModalRejector = reject;
    });
    let mode: Mode;
    const credentials = await SecureKeychain.getGenericPassword();
    mode = credentials === null ? 'choose' : 'enter';

    usePinStore.getState().init({ mode, pinModalResolver, pinModalRejector });
    usePinStore.getState().open();

    const password = await pinModalObserver;
    // usePinStore.destroy();
    return password as string;
  }
}
