import { ShareStore } from '@tkey/common-types';
import { inject, injectable } from 'tsyringe';

import { AuthProvider, AUTH_PROVIDER } from '@@domain/auth/constants/constants';
import { DeviceShareRepository } from '@@domain/auth/repositories/DeviceShareRepository';
import { ServerShareRepository } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepository } from '@@domain/auth/repositories/TorusShareRepository';
import { ETHEREUM } from '@@domain/blockchain/BlockChain';
import { Clutch, extendedKeyPath, keyDerivationPath } from '@@domain/blockchain/Clutch';
import SecureKeychain, { SECURE_TYPES } from '@@utils/SecureKeychain';

import { KeyClientUtil } from './KeyClientUtil';
interface PostboxKeyHolder {
  postboxKey: string;
  provider?: AuthProvider;
  providerIdToken?: string;
  providerAccessToken?: string;
  providerUserIdentifier?: string;
}

const serverShareRequiredError = new Error('servershare is required');

//TODO: 에러처리
export interface KeyClient {
  postboxKeyHolder: PostboxKeyHolder | null;
  serverShare: ShareStore | null;
  deviceShare: ShareStore | null;
  deviceShareIndex: string | null;
  triggerSocialSignIn: (provider: AuthProvider, isTemp?: boolean) => Promise<PostboxKeyHolder>;
  checkDevice: () => boolean;
  checkSignedUp: () => Promise<boolean>;
  checkServer: () => Promise<boolean>;
  checkSet: () => boolean;
  checkPincode: () => Promise<boolean>;
  getPrivateKey: () => Promise<string>;
  setDevice: (pincode: string) => Promise<void>;
  setServer: () => Promise<void>;
  setKeyFromDevice: () => Promise<void>;
  setKeyByMnemonic: (mnemonic: string) => Promise<void>;
  setKeyByServer: () => Promise<void>;
  generateKey: () => Promise<void>;
  generateMnemonic: () => Promise<string>;
  getMnemonicByPkey: () => string;
  generateDevice: () => Promise<string>;
  updateServer: () => Promise<void>;
  restoreServer: () => Promise<void>;
  delete: () => Promise<void>;
  signOut: () => void;
  findDeviceShareByServerShare: () => void;
}
@injectable()
export class KeyClientImpl implements KeyClient {
  postboxKeyHolder: PostboxKeyHolder | null;
  deviceShare: ShareStore | null;
  serverShare: ShareStore | null;
  deviceShareIndex: string | null;
  constructor(
    @inject('DeviceShareRepository') private deviceShareRepository: DeviceShareRepository,
    @inject('ServerShareRepository') private serverShareRepository: ServerShareRepository,
    @inject('TorusShareRepository') private torusShareRepository: TorusShareRepository,
    @inject('KeyClientUtil') private util: KeyClientUtil
  ) {
    this.postboxKeyHolder = null;
    this.deviceShare = null;
    this.serverShare = null;
    this.deviceShareIndex = null;
  }

  triggerSocialSignIn = async (provider: AuthProvider, isTemp?: boolean) => {
    const postboxKeyHolder = await this.torusShareRepository.triggerSocialByTorusCustomAuth(provider);
    const resultPostboxKeyHolder = { ...postboxKeyHolder, provider };
    if (!isTemp) {
      this.postboxKeyHolder = resultPostboxKeyHolder;
    }
    return resultPostboxKeyHolder;
  };
  checkDevice = () => {
    return this.deviceShareRepository.checkDeviceShare();
  };
  checkSignedUp = async () => {
    if (!this.postboxKeyHolder) {
      throw new Error('Please social signin first, postboxkey is required');
    }
    return await this.torusShareRepository.checkSignedUp(this.postboxKeyHolder.postboxKey);
  };
  checkServer = async () => {
    if (!this.postboxKeyHolder || !this.postboxKeyHolder.provider) {
      throw new Error('Please social signin first, postboxkey is required');
    }

    const { postboxKey, provider, providerIdToken, providerAccessToken } = this.postboxKeyHolder;
    const tKey = await this.torusShareRepository.init(postboxKey, true);
    const serverShareResponse = await this.serverShareRepository.findServerShare(tKey, provider, providerIdToken, providerAccessToken);
    if (!serverShareResponse) {
      return false;
    }
    const serverShare = ShareStore.fromJSON(JSON.parse(serverShareResponse.jsonString));
    this.serverShare = serverShare;
    return true;
  };
  checkSet = () => {
    if (!this.serverShare) {
      throw serverShareRequiredError;
    }
    const count = this.torusShareRepository.countTotalSharesInGroupOf(this.serverShare);
    switch (count) {
      case 2:
        return true;
      case 3:
        return false;
      default:
        //TODO: 어떤 에러를 뱉을 것인가?
        throw new Error('???오ㅐ때문에 없서');
    }
  };
  checkPincode = async () => {
    const credentials = await SecureKeychain.getGenericPassword();
    return !!credentials;
  };
  getPrivateKey = async () => {
    return this.torusShareRepository.getPrivateKey();
  };
  setDevice = async (pincode: string) => {
    if (!this.postboxKeyHolder || !this.deviceShare) {
      throw new Error('postboxKeyHolder, deviceShare is required');
    }
    await this.deviceShareRepository.saveDeviceShare(
      this.postboxKeyHolder.postboxKey,
      this.deviceShare,
      pincode,
      this.postboxKeyHolder.providerIdToken,
      this.postboxKeyHolder.providerAccessToken
    );
  };
  setServer = async () => {
    if (!this.postboxKeyHolder || !this.serverShare || !this.postboxKeyHolder.provider) {
      throw new Error('postboxKeyHolder, serverShare is required');
    }
    const privateKey = await this.getPrivateKey();
    const pubKey = Clutch.extendedPublicKey(privateKey, extendedKeyPath(ETHEREUM));
    await this.serverShareRepository.saveServerShare({
      type: this.postboxKeyHolder.provider,
      idtoken: this.postboxKeyHolder.providerIdToken,
      accessToken: this.postboxKeyHolder.providerAccessToken,
      identifier: this.postboxKeyHolder.providerUserIdentifier,
      share: this.util.shareToShareJson(this.serverShare),
      pubKey,
    });
  };
  setKeyFromDevice = async () => {
    const { postboxKey, share } = await this.deviceShareRepository.fetchDeviceShare();
    this.postboxKeyHolder = { postboxKey };
    await this.torusShareRepository.init(postboxKey, true);
    await this.torusShareRepository.assembleShares(share);
  };
  setKeyByMnemonic = async (mnemonic: string) => {
    if (!this.postboxKeyHolder || !this.postboxKeyHolder.provider) {
      throw new Error('postboxKey is required');
    }
    await this.torusShareRepository.initOverride(this.postboxKeyHolder.postboxKey, mnemonic);
    const newShareInfo = await this.torusShareRepository.generateAdditionalShare();
    this.serverShare = newShareInfo.share;
    await this.torusShareRepository.assembleShares();
  };
  setKeyByServer = async () => {
    if (!this.serverShare) {
      throw serverShareRequiredError;
    }
    await this.torusShareRepository.assembleShares(this.serverShare);
  };
  generateMnemonic = async () => {
    if (!this.postboxKeyHolder || !this.postboxKeyHolder.provider) {
      throw new Error('postboxKey is required');
    }
    await this.torusShareRepository.initOverride(this.postboxKeyHolder.postboxKey);
    const newShareInfo = await this.torusShareRepository.generateAdditionalShare();
    this.serverShare = newShareInfo.share;
    const assembleRes = await this.torusShareRepository.assembleShares();
    const BNprivateKey = assembleRes.privKey;
    return this.util.pkeyToMnemonic(BNprivateKey);
  };

  getMnemonicByPkey = () => {
    if (!this.torusShareRepository.tKey) {
      throw new Error('Tkey is required');
    }
    return this.util.pkeyToMnemonic(this.torusShareRepository.tKey.privKey);
  };

  generateKey = async () => {
    if (!this.postboxKeyHolder) {
      throw new Error('Please social signin first, postboxkey is required');
    }
    await this.torusShareRepository.init(this.postboxKeyHolder.postboxKey, false);
    const serverShareInfo = await this.torusShareRepository.generateAdditionalShare();
    const deviceShare = await this.torusShareRepository.findUknownShareByKnown(serverShareInfo.share);

    this.serverShare = serverShareInfo.share;
    this.deviceShare = deviceShare;
    return;
  };
  generateDevice = async () => {
    const res = await this.torusShareRepository.generateAdditionalShare();
    this.deviceShare = res.share;
    this.deviceShareIndex = res.index;
    const newPolynomialId = this.deviceShareIndex;
    return newPolynomialId;
  };
  updateServer = async () => {
    if (!this.serverShare || !this.deviceShare || !this.deviceShareIndex) {
      throw new Error('serverShare, deviceShare, deviceShareindex is required');
    }

    await this.serverShareRepository.updateServerShare(
      this.serverShare.share.share.toString('hex', 64),
      this.serverShare.share.shareIndex.toString('hex', 64),
      this.serverShare.polynomialID,
      this.deviceShareIndex
    );
  };
  restoreServer = async () => {
    if (!this.postboxKeyHolder || !this.postboxKeyHolder.provider || !this.serverShare) {
      throw new Error('postboxKey is required');
    }
    const privateKey = await this.getPrivateKey();
    const extendedKeyPair = Clutch.extendedKeyPair(privateKey, extendedKeyPath(ETHEREUM));
    const wallet0 = Clutch.createWalletWithEntropy(privateKey, keyDerivationPath(ETHEREUM, 0));
    const restoreObj = {
      type: this.postboxKeyHolder.provider,
      idtoken: this.postboxKeyHolder.providerIdToken,
      accessToken: this.postboxKeyHolder.providerAccessToken,
      share: this.util.shareToShareJson(this.serverShare),
      identifier: this.postboxKeyHolder.providerUserIdentifier,
      pubKey: extendedKeyPair.xpub,
      walletAddress0: wallet0.address,
    };
    //identifier 프로퍼티 지워줘야하는지? setserver에서는 그냥 보냄
    if (this.postboxKeyHolder.provider === AUTH_PROVIDER.GOOGLE) {
      delete restoreObj.identifier;
    }
    await this.serverShareRepository.restoreServerShare(restoreObj);
  };
  delete = async () => {
    try {
      const deviceShare = await this.deviceShareRepository.fetchDeviceShare();
      if (deviceShare === undefined) return;
      this.serverShareRepository.deleteServerShare();
      const postboxKey = deviceShare.postboxKey;
      await this.torusShareRepository.delete(postboxKey);
      this.deviceShareRepository.clearDeviceShare();
    } catch (error) {
      throw new Error(`delete account error:  ${error}`);
    }
  };

  signOut = () => {
    this.deviceShareRepository.clearDeviceShare();
  };

  findDeviceShareByServerShare = async () => {
    if (!this.serverShare) {
      throw serverShareRequiredError;
    }
    this.deviceShare = await this.torusShareRepository.findUknownShareByKnown(this.serverShare);
  };
}
