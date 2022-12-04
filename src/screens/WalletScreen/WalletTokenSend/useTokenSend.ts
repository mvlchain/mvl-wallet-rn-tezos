import { useEffect, useState } from 'react';

import { useDi } from '@@hooks/useDi';

import 'reflect-metadata';
import { BigNumber, BytesLike } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getNetworkConfig } from '@@constants/network.constant';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

const useTokenSend = (tokenDto: TokenDto) => {
  const transactionService = useDi('TransactionService');

  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { setState: pinSet } = pinStore;

  const network = getNetworkConfig(selectedNetwork);
  const { openModal, closeModal } = globalModalStore();

  //TODO: 뒤로가기할때 resetBody로 없애기

  const send = (gasFeeInfo: { baseFee: BigNumber; tip?: BigNumber; gasLimit: BigNumber }, data?: BytesLike) => {
    closeModal();
    return async () => {
      //TODO: 코드 중복됨 합칠수 있는지 보자.
      let pinModalResolver, pinModalRejector;
      const pinModalObserver = new Promise((resolve, reject) => {
        pinModalResolver = resolve;
        pinModalRejector = reject;
      });
      pinSet({ pinMode: PIN_MODE.CONFIRM, layout: PIN_LAYOUT.MODAL, pinModalResolver, pinModalRejector });
      try {
        await pinModalObserver;
      } catch (err) {
        closeModal();
      }
      try {
      } catch (err) {
        await transactionService.sendTransaction({ selectedNetwork, gasFeeInfo, to, value, data });
        resetBody();
        //goto result(result)
      }
    };
  };

  const confirmSend = async (gasFeeInfo: IGasFeeInfo, total: BigNumber) => {
    if (!to || !value) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, { recipientAddress: to, amount: value, fee: total, onConfirm: send(gasFeeInfo, data) });
  };

  const setAddress = (address: string) => {
    setBody({ to: address });
  };

  const setAmount = (amount: BigNumber) => {
    setBody({ value: amount });
  };

  useEffect(() => {
    resetBody();
  }, []);

  return { amount: value, setAmount, address: to, setAddress, confirmSend };
};
export default useTokenSend;
