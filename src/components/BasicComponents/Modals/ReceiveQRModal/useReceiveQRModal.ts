import dynamicLinks from '@react-native-firebase/dynamic-links';
import BigNumber from 'bignumber.js';
import qs from 'qs';

import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { IDeepLinkParam } from './ReceiveQRModal.type';

const domainUriPrefix = 'https://link.mvlclutch.io/short';

export const useReceiveQRModal = () => {
  const { selectedNetwork } = walletPersistStore();

  const generateQR = async ({ token, address, value }: IDeepLinkParam) => {
    const bigNumber = new BigNumber(value);
    const formalize = formatBigNumber(bigNumber, token.decimals);
    const qrLink = await buildReceiveShortLink({ token, address, value: formalize.toString() });
    return decodeURIComponent(qrLink);
  };

  const buildDeepLink = ({ token, address, value }: IDeepLinkParam) => {
    const { contractAddress } = token;
    const tokenAddress = contractAddress ? contractAddress : undefined;
    const link = `https://l.mvlclutch.io/link-transfer/${selectedNetwork}?${qs.stringify({ tokenAddress, address, value }, { charset: 'utf-8' })}`;
    return link;
  };

  const buildReceiveLink = async ({ token, address, value }: IDeepLinkParam) => {
    const buildLink = buildDeepLink({ token, address, value });
    console.log('buildLink:  ', buildLink);
    const link = await dynamicLinks().buildLink({
      link: buildLink,
      domainUriPrefix,
    });
    return link;
  };

  const buildReceiveShortLink = async ({ token, address, value }: IDeepLinkParam) => {
    const link = await dynamicLinks().buildShortLink({
      link: buildDeepLink({ token, address, value }),
      domainUriPrefix,
    });
    return link;
  };

  return {
    buildReceiveLink,
    buildReceiveShortLink,
    generateQR,
  };
};
