import { BigNumber } from 'ethers';
import { formatUnits, parseUnits, BytesLike } from 'ethers/lib/utils';
import { injectable, inject } from 'tsyringe';

import '@ethersproject/shims';
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

        default:
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

    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        if (!tip || !estimatedGas) {
          throw new Error(
            `Current network has Tezos network fee type, 
             tip parameter is required which means additionalFee in taquito`
          );
        }
        //Tezos needs conversion.
        //Because To make Tezos interface correspond with Ethereum, state stored and entered in units of big numbers
        const tipTezos = parseFloat(formatUnits(tip, 'gwei'));
        const estimatedGasTezos = parseFloat(formatUnits(estimatedGas, 'gwei'));
        return this.gasRepositoryTezos.getTotalGasFee({ tip: tipTezos, estimatedGas: estimatedGasTezos });

      case NETWORK_FEE_TYPE.EIP1559:
        if (!tip || !baseFee || !estimatedGas) {
          throw new Error(
            `Current network has Eip1559 network fee type, 
             So tip and baseFee, estimatedGas parameter is required 
             which means maxPriorityPerGas and gasPrice per gas and gasUsage in ethersjs`
          );
        }
        return this.gasRepositoryEip1559.getTotalGasFee({
          baseFee,
          tip,
          estimatedGas,
        });
      default:
        if (!baseFee || !gasLimit) {
          throw new Error(
            `Current network has legacy ethereum network fee type, 
             baseFee parameter is required which means gasPrice per gas in ethersjs`
          );
        }
        return this.gasRepository.getTotalGasFee({ baseFee, gasLimit });
    }
  };

  getEstimateTime = (gasLevel: TGasLevel) => {
    return GAS_LEVEL_SETTING[gasLevel].waitTime;
  };

  estimateGas = async ({ selectedNetwork, selectedWalletIndex, to, value, contractAddress, data }: IEstimateGasRequest) => {
    const network = getNetworkConfig(selectedNetwork);
    const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        if (contractAddress && data) {
          //작업필요
        } else if (to && value) {
          const valueTezos = parseFloat(formatUnits(value, 'gwei'));
          const gasUsageTezos = await this.gasRepositoryTezos.estimateGas({ rpcUrl: network.rpcUrl, to, amount: valueTezos });
          return parseUnits(gasUsageTezos.consumedMilligas.toString(), 'gwei');
        } else {
          throw new Error('request body must have contractAddress, data or to, value');
        }
      default:
        if (contractAddress && data) {
          return await this.gasRepository.estimateGas(
            { rpcUrl: network.rpcUrl, chainId: network.chainId },
            {
              from: wallet.address,
              to: contractAddress,
              data,
            }
          );
        } else if (to && value) {
          return await this.gasRepository.estimateGas({ rpcUrl: network.rpcUrl, chainId: network.chainId }, { from: wallet.address, to, value });
        } else {
          throw new Error('request body must have contractAddress, data or to, value');
        }
    }
  };
}
