import React from 'react';

import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import Picture from '@@components/BasicComponents/Picture';
import QRcode from '@@components/BasicComponents/QR/QRcode';
import useAccount from '@@components/Wallet/Account/useAccount';
import Address from '@@components/Wallet/Address';
import TokenListItem from '@@components/Wallet/TokenList/TokenListItem';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { getWidth, height, width } from '@@utils/ui';

import * as S from './WalletTokenReceive.style';
import { TTTokenReceiveRouteProps } from './WalletTokenRecieve.type';

function WalletTokenReceive() {
  const { t } = useTranslation();
  const { settedCurrency } = settingPersistStore();
  const { params } = useRoute<TTTokenReceiveRouteProps>();
  const { balance } = useOneTokenBalance(params.tokenDto);
  const { price } = useOneTokenPrice(params.tokenDto, balance);
  const { address } = useAccount();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <S.Container>
        <S.TokenInfoContainer>
          <S.TokenSymbolWrapper>
            {params.tokenDto.logoURI && <Picture url={params.tokenDto.logoURI} width={getWidth(38)} height={getWidth(38)} />}
            <S.TokenName>{params.tokenDto.symbol}</S.TokenName>
          </S.TokenSymbolWrapper>
          <S.TokenAmountWrapper>
            <S.TokenAmount>{balance}</S.TokenAmount>
            <S.TokenBaseCurrency>
              {price} {settedCurrency}
            </S.TokenBaseCurrency>
          </S.TokenAmountWrapper>
        </S.TokenInfoContainer>
        <S.Section>
          <Address address={address} />
        </S.Section>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.QRSection>
          <S.QRLabel>{t('scan_qr_code')}</S.QRLabel>
          <S.QRWrapper>
            <QRcode qr={address} />
          </S.QRWrapper>
        </S.QRSection>
      </S.Container>
    </ErrorBoundary>
  );
}

export default WalletTokenReceive;
