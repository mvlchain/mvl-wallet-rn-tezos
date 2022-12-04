import { useEffect, useState } from 'react';

import { useDi } from '@@hooks/useDi';

import 'reflect-metadata';
import { BigNumber, BytesLike } from 'ethers';

import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getNetworkConfig } from '@@constants/network.constant';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';

const useTokenSend = (tokenDto: TokenDto) => {
  const transactionService = useDi('TransactionService');

  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { setState: pinSet } = pinStore;

  const network = getNetworkConfig(selectedNetwork);
  const { openModal, closeModal } = globalModalStore();

  useEffect(() => {
    resetBody();
  }, []);

  useEffect(() => {
    setData();
  }, [to, value]);

  //TODO: 뒤로가기할때 resetBody로 없애기

  const setAddress = (address: string) => {
    setBody({ to: address });
  };

  const setAmount = (amount: BigNumber) => {
    setBody({ value: amount });
  };

  const setData = async () => {
    if (!to || !value) return;
    if (tokenDto.contractAddress) {
      const walletIndex = selectedWalletIndex[selectedNetwork];
      const data = await transactionService.encodeTransferData(walletIndex, network.bip44, to, value);
      setBody({
        data,
      });
    }
  };

  const confirmSend = async (gasFeeInfo: IGasFeeInfo, total: BigNumber) => {
    if (!to || !value) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, { recipientAddress: to, amount: value, fee: total, onConfirm: send(gasFeeInfo) });
  };

  const send = (gasFeeInfo: { baseFee: BigNumber; tip?: BigNumber; gasLimit: BigNumber }) => {
    closeModal();
    return async () => {
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
        if (!to || !value) {
          throw new Error('to address and value is required');
        }
        await transactionService.sendTransaction({ selectedNetwork, gasFeeInfo, to, value, data });
        resetBody();
        //goto result(result)
      } catch (err) {
        //goto result(result)
      }
    };
  };

  return { amount: value, setAmount, address: to, setAddress, confirmSend };
};
export default useTokenSend;
