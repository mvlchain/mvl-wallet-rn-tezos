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
import useTrade from './useTrade';
import useTradeApprove from './useTradeApprove';
import useTradeButtonValidation from './useTradeButtonValidation';
import { useTradeScreen } from './useTradeScreen';

function TradeScreen() {
  const { t } = useTranslation();
  const {
    fromToken,
    toToken,
    showTip,
    tradeFromValue,
    tradeToValue,
    priceImpact,
    priceImpactColor,
    quoteData,
    fromTradeVolumeRef,
    setShowTip,
    onPressToken,
    onPressChange,
    setTradeFromValue,
    setTradeFromAndStoreStateValidation,
    resetTradeScreen,
  } = useTradeScreen();

  const { isEnoughAllowance, onPressApprove } = useTradeApprove(fromToken);
  const { isReadyTrade, onPressTrade } = useTrade(fromToken, quoteData, resetTradeScreen);

  const [tradeValid, tradeLabel, onPressTradeOrApprove] = useTradeButtonValidation(isEnoughAllowance, isReadyTrade, onPressTrade, onPressApprove);
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
      {fromToken && toToken && (
        <S.InputContainer>
          <TradeVolume
            textInputRef={fromTradeVolumeRef}
            value={tradeFromValue}
            setValue={setTradeFromValue}
            tokenDto={fromToken}
            useMax={true}
            label={t('from')}
            handleTokenSelect={() => onPressToken('from')}
            setValueValid={setTradeFromAndStoreStateValidation}
          />
          <S.SwapButtonContainer>
            <S.SwapButton onPress={onPressChange}>
              <ChangeIconLight />
            </S.SwapButton>
          </S.SwapButtonContainer>
          <TradeVolume
            value={tradeToValue}
            setValue={() => {}}
            tokenDto={toToken}
            label={t('to_estimate')}
            hideBalance={true}
            handleTokenSelect={() => onPressToken('to')}
            editable={false}
            disableDelete={true}
          />
          <PrimaryButton onPress={onPressTradeOrApprove} label={tradeLabel} wrapperStyle={S.InlineStyle.button} disabled={!tradeValid} />
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
            <S.PriceImpactText priceImpactColor={priceImpactColor}>{priceImpact === '-' ? priceImpact : `${priceImpact}%`}</S.PriceImpactText>
          </S.PriceImpactContainer>
        </S.InputContainer>
      )}
    </S.Container>
  );
}

export default TradeScreen;
