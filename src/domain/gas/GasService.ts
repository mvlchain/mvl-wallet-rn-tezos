import { BigNumber } from 'ethers';
import { formatEther, formatUnits, parseUnits } from 'ethers/lib/utils';
import { injectable, inject } from 'tsyringe';

import { NETWORK_FEE_TYPE, getNetworkConfig, Network } from '@@constants/network.constant';
import { GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { WalletServiceImpl } from '@@domain/wallet/services/WalletService';

import { IEstimateGasRequest, IGasService, IGetTotalGasFeeRequest, TGasLevel } from './GasService.type';
import { GasRepositoryImpl } from './repository/gasRepository/GasRepository';
import { GasRepositoryEip1559Impl } from './repository/gasRepositoryEip1559/GasRepositoryEIP1559';
import { GasRepositoryTezosImpl } from './repository/gasRepositoryTezos/GasRepositoryTezos';
@injectable()
export class GasService implements IGasService {
  constructor(
    @inject('GasRepository') private gasRepository: GasRepositoryImpl,
    @inject('GasRepositoryEip1559') private gasRepositoryEip1559: GasRepositoryEip1559Impl,
    @inject('GasRepositoryTezos') private gasRepositoryTezos: GasRepositoryTezosImpl,
    @inject('WalletService') private walletService: WalletServiceImpl
  ) {}

  getGasFeeData = async (selectedNetwork: Network) => {
    const network = getNetworkConfig(selectedNetwork);
    try {
      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          return { enableTip: true, enableLimitCustom: false };
        case NETWORK_FEE_TYPE.EIP1559:
          const gasFeeDataEip1559 = await this.gasRepositoryEip1559.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
          return {
            baseFee: gasFeeDataEip1559.lastBaseFeePerGas,
            enableTip: true,
            enableLimitCustom: true,
            gasLimit: BigNumber.from(21000),
          };
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          const gasFeeData = await this.gasRepository.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
          return {
            baseFee: gasFeeData.gasPrice,
            enableTip: false,
            enableLimitCustom: true,
            gasLimit: BigNumber.from(21000),
          };
      }
    } catch (err) {
      console.log(err);
    }
  };

  getTotalGasFee = ({ selectedNetwork, baseFee, tip, estimatedGas, gasLimit }: IGetTotalGasFeeRequest) => {
    const network = getNetworkConfig(selectedNetwork);
    try {
      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!tip || !estimatedGas || !baseFee) {
            throw new Error(`basefee, tip,estimatedGas is required`);
          }
          return this.gasRepositoryTezos.getTotalGasFee({ baseFee, tip, estimatedGas });
        case NETWORK_FEE_TYPE.EIP1559:
          if (!tip || !baseFee || !estimatedGas) {
            throw new Error(`basefee, tip,estimatedGas is required`);
          }
          return this.gasRepositoryEip1559.getTotalGasFee({
            baseFee,
            tip,
            estimatedGas,
          });
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          if (!baseFee || !gasLimit) {
            throw new Error(`basefee,estimatedGas is required`);
          }
          return this.gasRepository.getTotalGasFee({ baseFee, gasLimit });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async ({ selectedNetwork, selectedWalletIndex, to, value, data }: IEstimateGasRequest) => {
    try {
      const network = getNetworkConfig(selectedNetwork);
      const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!value) {
            throw new Error('value is required');
          }
          const valueTezos = parseFloat(formatEther(value));
          const estimationTezos = await this.gasRepositoryTezos.estimateGas({
            rpcUrl: network.rpcUrl,
            walletPrivateKey: wallet.privateKey,
            to,
            amount: valueTezos,
          });
          if (!estimationTezos) {
            throw new Error('fail to estimate');
          }
          return {
            baseFee: parseUnits(estimationTezos.usingBaseFeeMutez.toString(), 'ether'),
            gasUsage: parseUnits(estimationTezos.gasLimit.toString(), 'ether'),
          };
        case NETWORK_FEE_TYPE.EIP1559:
          const estimationEip1559 = await this.gasRepository.estimateGas(
            { rpcUrl: network.rpcUrl, chainId: network.chainId },
            { from: wallet.address, to, value, data }
          );
          return { gasUsage: estimationEip1559 };
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          const estimationLegacy = await this.gasRepository.estimateGas(
            { rpcUrl: network.rpcUrl, chainId: network.chainId },
            { from: wallet.address, to, value, data }
          );
          return { gasUsage: estimationLegacy };
      }
    } catch (err) {
      console.log(err);
    }
  };
}
