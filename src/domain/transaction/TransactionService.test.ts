import { BigNumber, ethers } from 'ethers';

import { EthersTransactionImpl } from './TransactionService';
import { ITransactionService } from './TransactionService.type';

const transactionService: ITransactionService = new EthersTransactionImpl();

it('constructs correctly', () => {
  expect(transactionService).toBeDefined();
});
