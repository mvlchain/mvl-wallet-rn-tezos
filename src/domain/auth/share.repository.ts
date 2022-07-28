import { ShareStore } from '@tkey/common-types';
import { ShareStoreMap } from '@tkey/common-types/src/base/ShareStore';
import ThresholdKey from '@tkey/core';
import qs from 'qs';

import useStore, { DeviceShareHolderDto } from '@@store/index';

import { components } from '../../generated/generated-scheme';
import Encryptor from '../../utils/Encryptor';
import SecureKeychain from '../../utils/SecureKeychain';
import { request } from '../../utils/request';

import { AuthProvider, DeviceShareHolder } from './auth.interface';

type ShareResponseDto = components['schemas']['ShareResponseDto'];

export default class ShareRepository {
  private static encryptor = new Encryptor();

  static async fetchDeviceShare(): Promise<DeviceShareHolder | undefined> {
    const dto: DeviceShareHolderDto | undefined = useStore.getState().deviceShare;
    if (dto === undefined) {
      return undefined;
    }

    const credentials = await SecureKeychain.getGenericPassword();
    if (credentials === null) {
      throw new Error('local pin code not defined?!?');
    }

    const postboxKeyJson = await this.encryptor.decrypt(credentials.password, dto.postboxKeyJsonEncrypted);
    const idTokenJson = await this.encryptor.decrypt(credentials.password, dto.idTokenJsonEncrypted);
    const shareJson = await this.encryptor.decrypt(credentials.password, dto.shareJsonEncrypted);

    return new DeviceShareHolder(postboxKeyJson.postboxKey, ShareStore.fromJSON(shareJson), dto.polynomialId, idTokenJson.idToken);
  }

  static async findServerShare(tKey: ThresholdKey, provider: AuthProvider, providerIdToken: string): Promise<ShareStore | undefined> {
    // TODO: use latestPublicPolynomial first

    for (const polyId in tKey.metadata.publicPolynomials) {
      const shareStoreMap: ShareStoreMap | undefined = tKey.shares[polyId];
      if (shareStoreMap === undefined) {
        continue;
      }
      const torusShare: ShareStore | undefined = shareStoreMap['1'];
      if (torusShare === undefined) {
        continue;
      }
      const serverShareResponse = await ShareRepository.fetchServerShare(provider, providerIdToken, torusShare.polynomialID);
      if (serverShareResponse !== undefined) {
        return ShareStore.fromJSON(JSON.parse(serverShareResponse.jsonString));
      }
    }
    return undefined;
  }

  static async fetchServerShare(provider: AuthProvider, idToken: string, polynomialId: string): Promise<ShareResponseDto | undefined> {
    try {
      const endpoint = `/v1/accounts/ss?${qs.stringify({
        provider: provider,
        // 대문자 없이 idtoken 임 조심할것
        idtoken: idToken,
        polynomialId: polynomialId,
      })}`;
      const res = await request.get(endpoint);
      return res.data;
    } catch (e) {
      return undefined;
    }
  }

  static async updateServerShare(share: string, shareIndex: string, polynomialId: string): Promise<ShareResponseDto | undefined> {
    try {
      const endpoint = '/v1/accounts/ss';
      const jsonString = JSON.stringify({
        share: {
          share,
          shareIndex,
        },
        // polynomialID 에서 ID 대문자인것 조심
        polynomialID: polynomialId,
      });
      const body: components['schemas']['UpdateServerShareDto'] = {
        share: jsonString,
      };
      const res = await request.post(endpoint, {
        data: body,
      });
      return res.data;
    } catch (e) {
      return undefined;
    }
  }

  static async saveDeviceShare(postboxKey: string, deviceShare: ShareStore, idToken: string, requirePassword: () => Promise<string>) {
    const pw = await requirePassword();
    let postboxKeyJsonEncrypted = await this.encryptor.encrypt(pw, {
      postboxKey: postboxKey,
    });
    let shareJsonEncrypted = await this.encryptor.encrypt(pw, deviceShare.toJSON());
    let idTokenJsonEncrypted = await this.encryptor.encrypt(pw, {
      idToken: idToken,
    });
    const deviceShareHolder = new DeviceShareHolderDto(postboxKeyJsonEncrypted, shareJsonEncrypted, deviceShare.polynomialID, idTokenJsonEncrypted);
    useStore.setState({ deviceShare: deviceShareHolder });
    // TODO: save deviceShareIndex to server
  }
}
