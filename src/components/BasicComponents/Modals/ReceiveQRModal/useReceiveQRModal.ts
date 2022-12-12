import { useEffect, useState } from 'react';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import qs from 'qs';

import { IDeepLinkParam, IUseReceiveQRModalParam } from './ReceiveQRModal.type';

const domainUriPrefix = 'https://link.mvlclutch.io/short';

export const useReceiveQRModal = ({ token, address, value }: IUseReceiveQRModalParam) => {
  const [qr, setQR] = useState<string>();

  useEffect(() => {
    (async () => {
      const qrLink = await buildReceiveLink({ token, address, value });
      console.log('qrLink:  ', qrLink);
      setQR(qrLink);
    })();
  }, []);

  const buildDeepLink = ({ token, address, value }: IDeepLinkParam) => {
    const { symbol, contractAddress } = token;
    const tokenAddress = contractAddress ? contractAddress : undefined;
    const link = `https://l.mvlclutch.io/${symbol}?${qs.stringify({ tokenAddress, address, value })}`;
    return link;
  };

  const buildReceiveLink = async ({ token, address, value }: IDeepLinkParam) => {
    const link = await dynamicLinks().buildLink({
      link: buildDeepLink({ token, address, value }),
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
