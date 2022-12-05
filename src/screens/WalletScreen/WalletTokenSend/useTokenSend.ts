import { useEffect } from 'react';

import { BigNumber } from 'ethers';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';
import 'reflect-metadata';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

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
    if (!to || !value || network.networkFeeType === NETWORK_FEE_TYPE.TEZOS) return;
    if (tokenDto.contractAddress) {
      const walletIndex = selectedWalletIndex[selectedNetwork];
      const data = await transactionService.encodeTransferData(walletIndex, network.bip44, to, value);
      setBody({
        data,
      });
    }
  };

  const confirm = async (gasFeeInfo: IGasFeeInfo, total: BigNumber) => {
    if (!to || !value) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, { recipientAddress: to, amount: value, fee: total, tokenDto, onConfirm: send(gasFeeInfo) });
  };

  const send = (gasFeeInfo: { baseFee: BigNumber; tip?: BigNumber; gasLimit: BigNumber }) => {
    if (!to || !value) {
      throw new Error('to address and value is required');
    }
    closeModal();
    return async () => {
      let pinModalResolver, pinModalRejector;
      const pinModalObserver = new Promise((resolve, reject) => {
        pinModalResolver = resolve;
        pinModalRejector = reject;
      });
      pinSet({ pinMode: PIN_MODE.CONFIRM, layout: PIN_LAYOUT.MODAL, pinModalResolver, pinModalRejector });
      openModal('CONFIRM_TX_PIN', undefined);
      try {
        await pinModalObserver;
        closeModal();
        await transactionService.sendTransaction({
          selectedNetwork,
          selectedWalletIndex: selectedWalletIndex[selectedNetwork],
          gasFeeInfo,
          to,
          value,
          data,
        });
        resetBody();
        //goto result(result)
      } catch (err) {
        //goto result(result)
      }
    };
  };

  return { amount: value, setAmount, address: to, setAddress, confirm };
};
export default useTokenSend;
