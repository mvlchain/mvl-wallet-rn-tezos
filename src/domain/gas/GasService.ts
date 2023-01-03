import { BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberEther } from 'ethers';
import { injectable, inject } from 'tsyringe';

import { NETWORK_FEE_TYPE, getNetworkConfig, Network, COIN_DTO } from '@@constants/network.constant';
import { WalletServiceImpl } from '@@domain/wallet/services/WalletService';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { IEstimateGasRequest, IGasService, IGetTotalGasFeeRequest } from './GasService.type';
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
            baseFee: gasFeeDataEip1559.lastBaseFeePerGas ?? null,
            enableTip: true,
            enableLimitCustom: true,
            gasLimit: new BigNumber(21000),
          };
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          const gasFeeData = await this.gasRepository.getGasFeeData({ rpcUrl: network.rpcUrl, chainId: network.chainId });
          return {
            baseFee: gasFeeData.gasPrice,
            enableTip: false,
            enableLimitCustom: true,
            gasLimit: new BigNumber(21000),
          };
      }
    } catch (err) {
      console.log(err);
    }
  };

  getTotalGasFee = ({ selectedNetwork, baseFee, tip, gas }: IGetTotalGasFeeRequest) => {
    const network = getNetworkConfig(selectedNetwork);
    try {
      switch (network.networkFeeType) {
        case NETWORK_FEE_TYPE.TEZOS:
          if (!tip || !baseFee) {
            throw new Error(`basefee, tip,estimatedGas is required`);
          }
          return this.gasRepositoryTezos.getTotalGasFee({ baseFee, tip });
        case NETWORK_FEE_TYPE.EIP1559:
          if (!tip || !baseFee || !gas) {
            throw new Error(`basefee, tip,estimatedGas is required`);
          }
          return this.gasRepositoryEip1559.getTotalGasFee({
            baseFee,
            tip,
            gas,
          });
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          if (!baseFee || !gas) {
            throw new Error(`basefee,estimatedGas is required`);
          }
          return this.gasRepository.getTotalGasFee({
            baseFee,
            gas,
          });
      }
    } catch (err) {
      console.log(err);
    }
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
          const estimationTezos = await this.gasRepositoryTezos.estimateGas({
            rpcUrl: network.rpcUrl,
            walletPrivateKey: wallet.privateKey,
            to,
            amount: +formatBigNumber(value, COIN_DTO[network.coin].decimals).toString(10),
          });
          if (!estimationTezos) {
            throw new Error('fail to estimate');
          }
          return {
            baseFee: new BigNumber(estimationTezos.minimalFeeMutez),
            storageFee: new BigNumber(estimationTezos.burnFeeMutez), //새로운 토큰 처음 보낼 때만 쓰임, 고정값
            storageLimit: new BigNumber(estimationTezos.storageLimit),
            gasUsage: new BigNumber(estimationTezos.gasLimit), //사실상 사용안함
          };
        case NETWORK_FEE_TYPE.EIP1559:
          const estimationEip1559 = await this.gasRepository.estimateGas(
            { rpcUrl: network.rpcUrl, chainId: network.chainId },
            { from: wallet.address, to, value: value ? value.toString() : undefined, data }
          );
          return { gasUsage: estimationEip1559 };
        case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
          const estimationLegacy = await this.gasRepository.estimateGas(
            { rpcUrl: network.rpcUrl, chainId: network.chainId },
            { from: wallet.address, to, value: value ? value.toString() : undefined, data }
          );
          return { gasUsage: estimationLegacy };
      }
    } catch (err) {
      console.log(err);
    }
  };
}
