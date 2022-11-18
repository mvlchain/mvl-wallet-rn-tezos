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
it('send transaction', () => {
  const EthersTransactionImpl = container.resolve<EthersTransactionImpl>('EthersTransactionImpl');
  const privateKey = '0x8082bea335283b2ac437fb6a93530dcf8aea48db478f7b0df871568d17b0094e';
  const publicKey = '0x02651f62235846b48330c26bcbf20c85238b040f9b11cf5cfc335de66632309cdc';
  const myAddress = '0x1278699a3a2f9E9FDB969daaC0BCF23aB26fd82F';

  EthersTransactionImpl.sendTransaction({
    networkInfo: { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97 },
    privateKey,
    gasFeeInfo: { gasPrice: BigNumber.from('1'), gasLimit: BigNumber.from('1') },
    from: myAddress,
    to: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
    value: BigNumber.from('1'),
  });
});
