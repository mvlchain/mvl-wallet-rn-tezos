import { useEffect, useState } from 'react';

import qs from 'qs';

import { useDi } from '@@hooks/useDi';

/**
 * @param receiptUrl a url
 * @returns a url containing extended public key at the end of query string.
 */
export const useRewardReceiptUrlByExtenedPublicKey = (receiptUrl?: string) => {
  const keyClient = useDi('KeyClient');
  const [rewardReceiptUrl, setRewardReceiptUrl] = useState<string>('');

  useEffect(() => {
    if (!receiptUrl) return;

    const withExtendPublicKey = async () => {
      const xpub = await keyClient.getExtendPublicKey();
      setRewardReceiptUrl(
        `${receiptUrl}?${qs.stringify({
          pubKey: xpub,
        })}`
      );
    };

    withExtendPublicKey();
  }, [receiptUrl]);

  return {
    rewardReceiptUrl,
  };
};
