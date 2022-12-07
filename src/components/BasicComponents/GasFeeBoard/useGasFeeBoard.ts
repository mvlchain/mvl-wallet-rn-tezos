import { useEffect, useState, useMemo, useCallback } from 'react';

import { BigNumber } from 'ethers';
import { BytesLike, parseUnits } from 'ethers/lib/utils';

import { getNetworkConfig, getNetworkName, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { IGasFeeInfo, TGasLevel } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getLeveledBaseFee } from '@@utils/gas';

const useGasFeeBoard = (tokenDto: TokenDto, onConfirm: (param: IGasFeeInfo, total: BigNumber) => Promise<void>) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);

  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(null);

  //The reference values from blockchain
  const [estimatedGas, setEstimatedGas] = useState<BigNumber | null>(null);
  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The values to be entered by the user
  const [customBaseFee, setCustomBaseFee] = useState<BigNumber | null>(null);
  const [customTip, setCustomTip] = useState<BigNumber | null>(null);
  const [customGasLimit, setCustomGasLimit] = useState<BigNumber | null>(null);

  const leveledBaseFee = useMemo(() => {
    return getLeveledBaseFee(network.networkFeeType, gasLevel, baseFee);
  }, [gasLevel, baseFee]);
  const tip = useMemo(() => {
    return GAS_LEVEL_SETTING[gasLevel].tip;
  }, [gasLevel]);

  const { to, value, data } = transactionRequestStore();

  useEffect(() => {
    setInitialGas();
  }, []);

  useEffect(() => {
    if (!to || !value) return;
    if (!!tokenDto.contractAddress && !data) return;
    estimateGas({ to, value, data, contractAddress: tokenDto.contractAddress });
  }, [to, value, data]);

  useEffect(() => {
    if (network.networkFeeType === NETWORK_FEE_TYPE.EIP1559) {
      const validBaseFee = leveledBaseFee && tip.gt(leveledBaseFee) ? tip : leveledBaseFee;
      setCustomBaseFee(validBaseFee);
    } else {
      setCustomBaseFee(leveledBaseFee);
    }
  }, [leveledBaseFee]);

  useEffect(() => {
    setCustomTip(tip);
  }, [tip]);

  useEffect(() => {
    setCustomGasLimit(estimatedGas);
  }, [estimatedGas]);

  const setInitialGas = useCallback(async () => {
    try {
      const gasFeeData = await gasService.getGasFeeData(selectedNetwork);
      if (!gasFeeData) {
        throw new Error('Fail to get gasfee data');
      }
      setEnableTip(gasFeeData.enableTip);
      setEnableLimitCustom(gasFeeData.enableLimitCustom);
      setBaseFee(gasFeeData.baseFee ?? null);
      setGasLimit(gasFeeData.gasLimit ?? null);
      setCustomGasLimit(gasFeeData.gasLimit ?? null);
    } catch (err) {
      console.log(err);
    }
  }, [selectedNetwork]);

  const estimateGas = useCallback(
    async ({ to, value, data, contractAddress }: { to: string; value: BigNumber; data?: BytesLike | null; contractAddress?: string | null }) => {
      const gasUsage = await gasService.estimateGas({
        selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        to: contractAddress ?? to,
        value: contractAddress ? undefined : value,
        data: contractAddress ? data! : undefined,
        //data set after entering to and value in useTokenSend useEffect, so add non-null assertion
      });
      if (!gasUsage) {
        console.log('fail to estimate gas');
        return;
      }
      setEstimatedGas(gasUsage);
      setCustomGasLimit(gasUsage);
    },
    []
  );

  const transactionFee = useMemo(() => {
    if (!customBaseFee || !customGasLimit) return '-';
    if (network.networkFeeType !== NETWORK_FEE_TYPE.EVM_LEGACY_GAS && !customTip) return '-';
    const total = gasService.getTotalGasFee({
      selectedNetwork,
      baseFee: customBaseFee,
      tip: customTip,
      gasLimit: customGasLimit,
      estimatedGas,
    });
    if (!total) {
      console.log('fail to get total');
      return '-';
    }
    return total;
  }, [customBaseFee, customTip, customGasLimit, estimatedGas]);

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  //Wrap up the send transaction function which from useTokenSend and inject parameters
  const onConfirmGasFee = useCallback(async () => {
    if (!customBaseFee || !customGasLimit || transactionFee === '-') return;
    if (enableTip || !customTip) return;
    onConfirm({ baseFee: customBaseFee, tip: customTip, gasLimit: customGasLimit }, parseUnits(transactionFee, 'ether'));
  }, [customBaseFee, customGasLimit, transactionFee, customTip, enableTip, onConfirm]);

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
