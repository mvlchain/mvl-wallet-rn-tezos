import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { inject, injectable } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { NetworkId, getNetworkConfig, Network } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { BnToEtherBn, etherBNtoBN } from '@@utils/formatBigNumber';
import { request } from '@@utils/request';

export interface ITokenRepository {
  getToken: (network: NetworkId) => Promise<TokenDto[]>;
  getAllowance: (selectedNetwork: Network, selectedWalletPrivateKey: string, spender: string, contractAddress: string) => Promise<BigNumber | null>;
  setApprove: (selectedNetwork: Network, spender: string, contractAddress: string, value: BigNumber) => Promise<boolean>;
}

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@inject('EvmJsonRpcProviderHolder') private evmJsonRpcProviderHolder: EvmJsonRpcProviderHolder) {}

  getToken = async (network: NetworkId): Promise<TokenDto[]> => {
    const endpoint = `v1/token/${network}`;
    const res = await request.get<TokenDto[]>(endpoint);
    return res.data;
  };

  getAllowance = async (selectedNetwork: Network, selectedWalletPrivateKey: string, spender: string, contractAddress: string) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(selectedWalletPrivateKey, provider);
    const abi = abiERC20;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const allowance = await contract.allowance(wallet.address, spender);
    return etherBNtoBN(allowance);
  };

  setApprove = async (selectedNetwork: Network, spender: string, contractAddress: string, value: BigNumber) => {
    const network = getNetworkConfig(selectedNetwork);
    const provider = this.evmJsonRpcProviderHolder.getProvider(network.rpcUrl);
    const abi = abiERC20;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    return await contract.approve(spender, BnToEtherBn(value));
  };
}
