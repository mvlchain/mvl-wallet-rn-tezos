import React from 'react';

import { BigNumber } from 'bignumber.js';
import Decimal from 'decimal.js';
import { useTranslation } from 'react-i18next';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { COIN_DTO, getNetworkConfig, getNetworkByBase, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { height } from '@@utils/ui';

import { MODAL_TYPES } from '../../GlobalModal';

import * as S from './ConfirmSendModal.style';
import { IConfirmSendModalProps } from './ConfirmSendModal.type';

function ConfirmSendModal({ onConfirm, tokenDto }: IConfirmSendModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const { settedCurrency } = settingPersistStore();

  const { total } = gasStore();
  const { value, to } = transactionRequestStore();

  const totalStr = formatBigNumber(total!, COIN_DTO[network.coin].decimals).toString(10);
  const amountStr = formatBigNumber(value!, tokenDto.decimals).toString(10);
  const { price: tokenPrice } = useOneTokenPrice(tokenDto, amountStr);
  const { price: coinPrice } = useOneTokenPrice(COIN_DTO[network.coin], totalStr);
  const tokenPriceInDeciaml = new Decimal(tokenPrice);
  const coinPriceInDecimal = new Decimal(coinPrice);

  const feeAmountTotal = tokenPriceInDeciaml.add(coinPriceInDecimal).toString();

  return (
    <ModalLayout
      title={t('confirm_send')}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.CONFIRM_SEND}
      onClose={() => {
        closeModal();
      }}
      onCancel={() => {
        closeModal();
      }}
      onConfirm={onConfirm}
    >
      <S.TopContainer>
        <S.GreyText>{'Recipient Address'}</S.GreyText>
        <S.LargeBlackText>{to}</S.LargeBlackText>
      </S.TopContainer>
      <S.MiddleContainer>
        <S.Row>
          <S.BlackText> {t('send_amount')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{value && `${amountStr} ${tokenDto.symbol}`}</S.BlackText>
            <S.GreyText>{`${tokenPrice} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <S.Row style={{ marginBottom: height * 16 }}>
          <S.BlackText>{t('transaction_fee')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{totalStr && `${totalStr} ${network.coin}`}</S.BlackText>
            <S.GreyText>{`${coinPrice} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.Row>
          <S.BlackText>{t('total')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{value && totalStr && `${amountStr} ${tokenDto.symbol} + ${totalStr} ${network.coin}`}</S.BlackText>
            <S.GreyText>{`${feeAmountTotal} ${settedCurrency}`}</S.GreyText>
          </S.RightAlign>
        </S.Row>
      </S.MiddleContainer>
    </ModalLayout>
  );
}

export default ConfirmSendModal;
