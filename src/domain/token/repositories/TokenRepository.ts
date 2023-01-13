import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { NetworkId, getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { etherBNtoBN } from '@@utils/formatBigNumber';
import { request } from '@@utils/request';

export interface ITokenRepository {
  getToken: (network: NetworkId) => Promise<TokenDto[]>;
  getAllowance: (selectedNetwork: Network, selectedWalletIndex: number, spender: string, contractAddress: string) => Promise<BigNumber | null>;
}

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder,
    @inject('WalletService') private walletService: WalletService
  ) {}

  getToken = async (network: NetworkId): Promise<TokenDto[]> => {
    const endpoint = `v1/token/${network}`;
    const res = await request.get<TokenDto[]>(endpoint);
    return res.data;
  };

  getAllowance = async (selectedNetwork: Network, selectedWalletIndex: number, spender: string, contractAddress: string) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    const wallet = await this.walletService.getWalletInfo({ index: selectedWalletIndex, network: selectedNetwork });
    const abi = abiERC20;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const allowance = await contract.allowance(wallet.address, spender);
    return etherBNtoBN(allowance);
  };
}
