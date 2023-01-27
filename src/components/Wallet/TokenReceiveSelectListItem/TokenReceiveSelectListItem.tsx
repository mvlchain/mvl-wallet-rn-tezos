import React, { useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import Picture from '@@components/BasicComponents/Picture';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { getWidth, width } from '@@utils/ui';

import * as S from './TokenReceiveSelectListItem.style';
import { ITokenReceiveSelectListItemProps } from './TokenReceiveSelectListItem.type';

function TokenReceiveSelectListItem({ tokenItem, amount, onPress }: ITokenReceiveSelectListItemProps) {
  const { t } = useTranslation();
  const [displayAmount, setDisplayAmount] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!amount) return;
    const bigNumber = new BigNumber(amount);
    const formalize = formatBigNumber(bigNumber, tokenItem.decimals);
    setDisplayAmount(formalize.toFixed());
  }, [amount]);

  return (
    <S.Container>
      <S.DataContainer>
        {tokenItem.logoURI && (
          <S.IconWrapper>
            <Picture url={tokenItem.logoURI} width={getWidth(36)} height={getWidth(36)} />
          </S.IconWrapper>
        )}
        <S.Text>
          {displayAmount && displayAmount} {tokenItem.symbol}
        </S.Text>
      </S.DataContainer>
      <PrimaryButton onPress={onPress} label={t('receive')} size={BUTTON_SIZE.FIT} />
    </S.Container>
  );
}

export default TokenReceiveSelectListItem;
