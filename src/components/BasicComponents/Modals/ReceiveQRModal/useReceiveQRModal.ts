import dynamicLinks from '@react-native-firebase/dynamic-links';
import BigNumber from 'bignumber.js';
import qs from 'qs';

import { URL_DYNAMIC_LINK } from '@@constants/url.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';

import { IDeepLinkParam } from './ReceiveQRModal.type';

export const useReceiveQRModal = () => {
  const { selectedNetwork } = walletPersistStore();
  const qrPayLogger = tagLogger('QrPay');

  const generateQR = async ({ token, address, value }: IDeepLinkParam) => {
    const qrLink = await buildReceiveShortLink({ token, address, value });
    console.log(`QrPay> QrLink: ${qrLink}`);
    return qrLink;
  };

  const buildDeepLink = ({ token, address, value }: IDeepLinkParam) => {
    const { contractAddress } = token;
    const tokenAddress = contractAddress ? contractAddress : undefined;
    const amount = value.toFixed();
    const link = `https://l.mvlclutch.io/link-transfer/${selectedNetwork}?${qs.stringify({ tokenAddress, address, value: amount })}`;
    qrPayLogger.log(`built QrLink ${qs.stringify({ tokenAddress, address, value: amount })}`);
    return decodeURIComponent(link);
  };

  const buildReceiveLink = async ({ token, address, value }: IDeepLinkParam) => {
    const buildLink = buildDeepLink({ token, address, value });
    console.log('buildLink:  ', buildLink);
    const link = await dynamicLinks().buildLink({
      link: buildLink,
      domainUriPrefix: `https://${URL_DYNAMIC_LINK}`,
    });
    return link;
  };

  const buildReceiveShortLink = async ({ token, address, value }: IDeepLinkParam) => {
    const link = await dynamicLinks().buildShortLink({
      link: buildDeepLink({ token, address, value }),
      domainUriPrefix: `https://${URL_DYNAMIC_LINK}`,
    });
    return link;
  };

  return {
    buildReceiveLink,
    buildReceiveShortLink,
    generateQR,
  };
};
