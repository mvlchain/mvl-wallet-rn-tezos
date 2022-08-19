import { ShareStore } from '@tkey/common-types';
import { ShareStoreMap } from '@tkey/common-types/src/base/ShareStore';
import ThresholdKey from '@tkey/core';
import qs from 'qs';

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
      throw new Error('local pin code not defined?!?');
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
}
