import { inject, injectable } from 'tsyringe';

import { ContractRepository } from './WalletBlockChainRepository';

export interface ContractService {}

@injectable()
export class EthersContractImpl implements ContractService {
  constructor(@inject('EthersContractRepository') private ethersContractRepository: ContractRepository) {}
}
