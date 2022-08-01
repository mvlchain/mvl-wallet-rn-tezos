import { BigNumber, ethers } from 'ethers';

import { EthersTransactionImpl, TransactionService } from './TransactionService';

const transactionService: TransactionService = new EthersTransactionImpl(
  { rpcUrl: 'http://localhost:3000', chainId: 1 },
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  {
    gasPrice: ethers.utils.formatUnits(BigNumber.from('100'), 'gwei'),
  },
);

it('constructs correctly', () => {
  expect(transactionService).toBeDefined();
});
