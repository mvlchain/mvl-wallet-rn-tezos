import { useEffect, useState, useMemo, useCallback } from 'react';

import { BigNumber } from 'ethers';
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';

import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { IGasFeeInfo, TGasLevel } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGasFeeBoard = (tokenDto: TokenDto, onConfirm: (param: IGasFeeInfo, total: BigNumber) => Promise<void>) => {
  const gasService = useDi('GasService');
  const transactionService = useDi('TransactionService');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();

  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(null);
  const [tip, setTip] = useState<BigNumber>(GAS_LEVEL_SETTING.MID.tip);

  //The values from blockchain
  const [estimatedGas, setEstimatedGas] = useState<BigNumber | null>(null);
  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);
  const [maxBaseFee, setMaxBaseFee] = useState<BigNumber | null>(null);
  const [maxTip, setMaxTip] = useState<BigNumber | null>(null);
  const [maxGasLimit, setMaxGasLimit] = useState<BigNumber | null>(null);

  //The values to be entered by the user
  const [customBaseFee, setCustomBaseFee] = useState<BigNumber | null>(null);
  const [customTip, setCustomTip] = useState<BigNumber | null>(null);
  const [customGasLimit, setCustomGasLimit] = useState<BigNumber | null>(null);

  const { to, value, data } = transactionRequestStore();

  useEffect(() => {
    setInitialGas();
  }, []);

  useEffect(() => {
    estimateGas();
  }, [to, value]);

  useEffect(() => {
    if (!advanced) return;
    //TODO: leveledBaseFee 입력하도록해야함 수정피료
    setCustomBaseFee(baseFee);
    setCustomTip(tip);
    setCustomGasLimit(gasLimit);
  }, [advanced, gasLevel]);

  const setInitialGas = async () => {
    const gasFeeData = await gasService.getGasFeeData(selectedNetwork);
    setBaseFee(gasFeeData.baseFee ?? null);
    setEnableTip(gasFeeData.enableTip);
    setEnableLimitCustom(gasFeeData.enableLimitCustom);
    setGasLimit(gasFeeData.gasLimit ?? null);
    setMaxBaseFee(gasFeeData.maxBaseFee ?? null);
    setMaxTip(gasFeeData.maxTip ?? null);
    setMaxGasLimit(gasFeeData.maxGasLimit ?? null);
  };

  const estimateGas = async () => {
    if (!to || !value) return;
    let gasUsage: BigNumber;
    if (data) {
      gasUsage = await gasService.estimateGas({
        to,
        value,
        selectedNetwork,
        data,
      });
    } else {
      gasUsage = await gasService.estimateGas({
        to,
        value,
        selectedNetwork,
      });
    }

    setEstimatedGas(gasUsage);
  };

  const transactionFee = useMemo(() => {
    if (advanced) {
      if (!customBaseFee || !estimatedGas) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee: customBaseFee,
        tip: customTip,
        estimatedGas,
      });
    } else {
      if (!baseFee || !estimatedGas) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee,
        tip,
        estimatedGas,
        gasLevel,
      });
    }
  }, [advanced, gasLimit, gasLevel, gasLimit]);

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  const onConfirmGasFee = async () => {
    if (!baseFee || !gasLimit) return;
    onConfirm({ baseFee, tip, gasLimit }, parseUnits(transactionFee, 'ether'));
  };

  return {
    advanced,
    gasLevel,
    gasLimit,
    enableTip,
    enableLimitCustom,
    estimatedGas,
    customBaseFee,
    customTip,
    customGasLimit,
    transactionFee,
    setGasLevel,
    setCustomBaseFee,
    setCustomTip,
    setCustomGasLimit,
    toggleGasAdvanced,
    onConfirmGasFee,
  };
};

export default useGasFeeBoard;
