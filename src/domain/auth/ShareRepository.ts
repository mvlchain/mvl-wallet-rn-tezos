/* eslint-disable max-lines */

import { ROOT_KEY, EXTENDED_PRIVATE_KEY, EXTENDED_PUBLIC_KEY } from 'constants/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShareStore } from '@tkey/common-types';
import { ShareStoreMap } from '@tkey/common-types/src/base/ShareStore';
import ThresholdKey from '@tkey/core';
import qs from 'qs';

import { ETHEREUM } from '@@domain/blockchain/BlockChain';
import { Clutch, extendedKeyPath } from '@@domain/blockchain/Clutch';
import { ExtendedKeyPair } from '@@domain/blockchain/ExtendedKeyPair';
import { InvalidCredentialError, InvalidPasswordError, NoCredentialFoundError } from '@@domain/error';
import useStore, { DeviceShareHolderDto } from '@@store/index';
import { request, authenticatedRequest } from '@@utils/request';

import { ShareResponseDto, UpdateServerShareDto } from '../../generated/generated-scheme';
import Encryptor from '../../utils/Encryptor';
import SecureKeychain from '../../utils/SecureKeychain';

import { AuthProvider, DeviceShareHolder } from './IAuthService';
export default class ShareRepository {
  private static encryptor = new Encryptor();

  static async fetchDeviceShare(): Promise<DeviceShareHolder | undefined> {
    const dto: DeviceShareHolderDto | undefined = useStore.getState().deviceShare;
    if (dto === undefined) {
      return undefined;
    }

    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials === null) {
      throw new NoCredentialFoundError('local pin code not defined?!?');
    }

    const postboxKeyJson = await this.encryptor.decrypt(credentials.password, dto.postboxKeyJsonEncrypted);
    const providerTokenJson = await this.encryptor.decrypt(credentials.password, dto.providerTokenJsonEncrypted);
    const shareJson = await this.encryptor.decrypt(credentials.password, dto.shareJsonEncrypted);

    return new DeviceShareHolder(postboxKeyJson.postboxKey, ShareStore.fromJSON(shareJson), dto.polynomialId, providerTokenJson);
  }

  static async findServerShare(
    tKey: ThresholdKey,
    provider: AuthProvider,
    providerIdToken?: string,
    providerAccessToken?: string
  ): Promise<ShareResponseDto | undefined> {
    const latestPolyId = tKey.metadata.getLatestPublicPolynomial().polynomialId;
    const res = await ShareRepository.fetchServerShare(provider, latestPolyId, providerIdToken, providerAccessToken);
    if (res !== undefined) {
      return res;
    }

    for (const polyId in tKey.metadata.publicPolynomials) {
      if (polyId === latestPolyId) {
        continue;
      }
      const shareStoreMap: ShareStoreMap | undefined = tKey.shares[polyId];
      if (shareStoreMap === undefined) {
        continue;
      }
      const torusShare: ShareStore | undefined = shareStoreMap['1'];
      if (torusShare === undefined) {
        continue;
      }
      return ShareRepository.fetchServerShare(provider, torusShare.polynomialID, providerIdToken, providerAccessToken);
    }
    return undefined;
  }

  static async fetchServerShare(
    provider: AuthProvider,
    polynomialId: string,
    idToken?: string,
    accessToken?: string
  ): Promise<ShareResponseDto | undefined> {
    try {
      const endpoint = `/v1/accounts/ss?${qs.stringify({
        provider: provider,
        // 대문자 없이 idtoken 임 조심할것
        idtoken: idToken,
        accessToken: accessToken,
        polynomialId: polynomialId,
      })}`;
      const res = await request.get(endpoint);
      if (res.status === 200) {
        return res.data;
      } else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  }

  static shareToShareJson(shareStore: ShareStore) {
    return JSON.stringify({
      share: {
        share: shareStore.share.share.toString('hex', 64),
        shareIndex: shareStore.share.shareIndex.toString('hex', 64),
      },
      // polynomialID 에서 ID 대문자인것 조심
      polynomialID: shareStore.polynomialID,
    });
  }

  static async updateServerShare(
    share: string,
    shareIndex: string,
    polynomialID: string,
    deviceShareIndex?: string
  ): Promise<ShareResponseDto | undefined> {
    try {
      const endpoint = '/v1/accounts/ss';
      const jsonString = JSON.stringify({
        share: {
          share,
          shareIndex,
        },
        // polynomialID 에서 ID 대문자인것 조심
        polynomialID,
        deviceShareIndex,
      });
      const body: UpdateServerShareDto = {
        share: jsonString,
      };
      const res = await authenticatedRequest.post(endpoint, {
        data: body,
      });
      return res.data;
    } catch (e) {
      return undefined;
    }
  }

  static async saveDeviceShare(postboxKey: string, deviceShare: ShareStore, password: string, idToken?: string, accessToken?: string) {
    let postboxKeyJsonEncrypted = await this.encryptor.encrypt(password, {
      postboxKey: postboxKey,
    });
    let shareJsonEncrypted = await this.encryptor.encrypt(password, deviceShare.toJSON());
    let providerTokenJsonEncrypted = await this.encryptor.encrypt(password, {
      idToken,
      accessToken,
    });
    const deviceShareHolder = new DeviceShareHolderDto(
      postboxKeyJsonEncrypted,
      shareJsonEncrypted,
      deviceShare.polynomialID,
      providerTokenJsonEncrypted
    );
    useStore.setState({ deviceShare: deviceShareHolder });
  }

  static async clearDeviceShare() {
    useStore.setState({ deviceShare: undefined });
  }

  /**
   * Save a torus root private key to local storage with encryption.
   * SecureKeychain.setGenericPassword should be set prior to run this method.
   *
   * code to fetch a password from keychain
   * ```
   * const credentials = await SecureKeychain.getGenericPassword();
   * if (credentials === null) {
   *   throw new InvalidPasswordError();
   * } else {
   *   console.log(`Key credentials: ${credentials}`);
   * }
   * const encrypted = await this.encryptor.encrypt(credentials.password, { credentials: privateKey } as KeyCredentials);
   * ```
   *
   * Testing
   * await ShareRepository.saveRootKey(key, '000000');
   * const restoredKey = await ShareRepository.getRootKey('000000');
   *
   * @param privateKey a private key retreived from Torus bridge interface.
   */
  static async saveRootKey(privateKey: string, password: string) {
    // extendedKeyPath(60) == "m/44'/60'/0'"
    const extendedKeyPair = Clutch.extendedKeyPair(privateKey, extendedKeyPath(ETHEREUM));

    const [encryptedRootKey, encryptedExtendedPrivateKey] = await Promise.all([
      this.encryptor.encrypt(password, { credentials: privateKey } as KeyCredentials),
      this.encryptor.encrypt(password, { credentials: extendedKeyPair.xprv } as KeyCredentials),
    ]);

    await AsyncStorage.multiSet([
      [ROOT_KEY, encryptedRootKey],
      [EXTENDED_PRIVATE_KEY, encryptedExtendedPrivateKey],
      [EXTENDED_PUBLIC_KEY, extendedKeyPair.xpub],
    ]);
  }

  /**
   * Save a torus root private key to local storage with encryption.
   * This method will get a password from KeyChain.
   * @param privateKey a private key retreived from Torus bridge interface.
   * @throws NoCredentialFoundError if pin-code credential no found from KeyChain
   */
  static async saveRootKeyByCredentials(privateKey: string) {
    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials === null) {
      throw new NoCredentialFoundError();
    }
    await ShareRepository.saveRootKey(privateKey, credentials.password);
  }

  /**
   * get a torus root private key
   * @param password
   * @returns a decrypted root private key
   * @throws InvalidPasswordError if failed to decrypt key
   * @throws InvalidCredentialError if key credentials are empty or null
   */
  static async getRootKey(password: string): Promise<string> {
    const encrypted = await AsyncStorage.getItem(ROOT_KEY);
    if (!encrypted) {
      throw new InvalidCredentialError();
    }
    try {
      const decrypted: KeyCredentials = await this.encryptor.decrypt(password, encrypted);
      return decrypted.credentials;
    } catch (e) {
      throw new InvalidPasswordError();
    }
  }

  /**
   * Get a torus root private key with credential
   * @returns a decrypted root private key
   * @throws InvalidCredentialError if key credentials are empty or null
   */
  static async getRootKeyByCredentials(): Promise<string> {
    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials === null) {
      throw new NoCredentialFoundError();
    }
    return ShareRepository.getRootKey(credentials.password);
  }

  /**
   * @returns extended key pair by decrypting it with credential
   */
  static async getExtendedKeyPairByCredentials(): Promise<ExtendedKeyPair> {
    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials === null) {
      throw new NoCredentialFoundError();
    }

    return ShareRepository.getExtendedKeyPair(credentials.password);
  }

  /**
   * @param password to decrypt extended private key
   * @returns extended key pair from AsyncStorage
   */
  static async getExtendedKeyPair(password: string): Promise<ExtendedKeyPair> {
    const [[, encryptedExtendPrivateKey], [, xpub]] = await AsyncStorage.multiGet([EXTENDED_PRIVATE_KEY, EXTENDED_PUBLIC_KEY]);
    if (!encryptedExtendPrivateKey || !xpub) {
      throw new InvalidCredentialError();
    }

    try {
      const decrypted: KeyCredentials = await this.encryptor.decrypt(password, encryptedExtendPrivateKey);
      return {
        xprv: decrypted.credentials,
        xpub: xpub,
      };
    } catch (e) {
      throw new InvalidPasswordError();
    }
  }

  static async getExtendedPublicKey(): Promise<string> {
    const result = await AsyncStorage.getItem(EXTENDED_PUBLIC_KEY);
    if (!result) {
      throw new InvalidCredentialError('No extended public key found.');
    }

    return result;
  }

  static async clearRootKey() {
    await AsyncStorage.multiRemove([ROOT_KEY, EXTENDED_PRIVATE_KEY, EXTENDED_PUBLIC_KEY]);
  }
}

type KeyCredentials = {
  credentials: string;
};
