import { useEffect, useState } from 'react';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import qs from 'qs';

import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IDeepLinkParam, IUseReceiveQRModalParam } from './ReceiveQRModal.type';

const domainUriPrefix = 'https://link.mvlclutch.io/short';

export const useReceiveQRModal = ({ token, address, value }: IUseReceiveQRModalParam) => {
  const [qr, setQR] = useState<string>();
  const { selectedNetwork } = walletPersistStore();

  useEffect(() => {
    (async () => {
      const qrLink = await buildReceiveLink({ token, address, value });
      console.log('qrLink:  ', decodeURIComponent(qrLink));
      setQR(decodeURIComponent(qrLink));
    })();
  }, []);

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
    qr,
  };
};
