import React, { useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { SvgUri } from 'react-native-svg';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { width } from '@@utils/ui';

import * as S from './TokenReceiveSelectListItem.style';
import { ITokenReceiveSelectListItemProps } from './TokenReceiveSelectListItem.type';

function TokenReceiveSelectListItem({ tokenItem, amount, onPress }: ITokenReceiveSelectListItemProps) {
  const { t } = useTranslation();
  const [displayAmount, setDisplayAmount] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!amount) return;
    const bigNumber = new BigNumber(amount);
    const formalize = formatBigNumber(bigNumber, tokenItem.decimals);
    setDisplayAmount(formalize.toString(10));
  }, [amount]);

  return (
    <S.Container>
      <S.DataContainer>
        {tokenItem.logoURI && (
          <S.IconWrapper>
            <SvgUri uri={tokenItem.logoURI} width={`${width * 36}`} height={`${width * 36}`} />
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
