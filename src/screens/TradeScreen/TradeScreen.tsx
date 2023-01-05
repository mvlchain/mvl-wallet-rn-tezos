import React from 'react';

import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';

import { ChangeIconLight, QuestionMarkIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Jdenticon from '@@components/BasicComponents/Jdenticon';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume/TradeVolume';
import useAccount from '@@components/Wallet/Account/useAccount';
import useWalletSelector from '@@components/Wallet/WalletSelector/useWalletSelector';

import * as S from './TradeScreen.style';
import { useTradeScreen } from './useTradeScreen';

function TradeScreen() {
  const { t } = useTranslation();
  const { fromToken, toToken, showTip, setShowTip, onPressToken, onPressChange, onPressTrade } = useTradeScreen();
  const { onPressWalletList } = useWalletSelector();
  const { address } = useAccount();

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>{t('trade')}</S.HeaderTitle>
        <S.WallerSelectButton onPress={onPressWalletList}>
          <Jdenticon value={address} />
        </S.WallerSelectButton>
      </S.Header>
      <S.InputContainer>
        {fromToken && (
          <TradeVolume
            onChange={() => console.log('')}
            tokenDto={fromToken}
            useMax={true}
            label={t('from')}
            handleTokenSelect={() => onPressToken('from')}
          />
        )}
        <S.SwapButtonContainer>
          <S.SwapButton onPress={onPressChange}>
            <ChangeIconLight />
          </S.SwapButton>
        </S.SwapButtonContainer>
        {toToken && (
          <TradeVolume
            onChange={() => console.log('')}
            tokenDto={toToken}
            label={t('to')}
            disableHint={true}
            handleTokenSelect={() => onPressToken('to')}
          />
        )}
        <PrimaryButton onPress={onPressTrade} label={t('enter_amount')} wrapperStyle={S.InlineStyle.button} />
        <S.PriceImpactContainer>
          <S.HelpWrapper>
            <S.PriceImpactText>{t('price_impact')}</S.PriceImpactText>
            <Tooltip
              isVisible={showTip}
              content={<S.PriceImpactHelp>{t('price_impact_explanation')}</S.PriceImpactHelp>}
              onClose={() => setShowTip(false)}
              placement='top'
              backgroundColor='transparent'
              contentStyle={S.InlineStyle.tooltip}
              arrowStyle={S.InlineStyle.tooltipArrow}
            >
              <S.PriceImpactHelpButton onPress={() => setShowTip(true)}>
                <QuestionMarkIcon />
              </S.PriceImpactHelpButton>
            </Tooltip>
          </S.HelpWrapper>
          <S.PriceImpactText>-</S.PriceImpactText>
        </S.PriceImpactContainer>
      </S.InputContainer>
    </S.Container>
  );
}

export default TradeScreen;
