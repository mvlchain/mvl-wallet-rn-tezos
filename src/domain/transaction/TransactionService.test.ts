import '@ethersproject/shims';
import { BigNumber, ethers } from 'ethers';
import { instanceCachingFactory, container } from 'tsyringe';

import { EthersTransactionImpl } from './TransactionService';
import { ITransactionService } from './TransactionService.type';

const transactionService: ITransactionService = new EthersTransactionImpl();

beforeAll(() => {
  container.register('EthersTransactionImpl', {
    useFactory: instanceCachingFactory<EthersTransactionImpl>((container) => container.resolve(EthersTransactionImpl)),
  });
});

afterAll(() => {
  container.dispose();
});

it('constructs correctly', () => {
  expect(transactionService).toBeDefined();
});
