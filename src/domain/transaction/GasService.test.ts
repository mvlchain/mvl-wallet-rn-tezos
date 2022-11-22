import '@ethersproject/shims';

import { formatEther } from 'ethers/lib/utils';
import { instanceCachingFactory, container } from 'tsyringe';

import { GasServiceImpl } from './GasService';

const networkInfo = { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97 };

beforeAll(() => {
  container.register('GasService', {
    useFactory: instanceCachingFactory<GasServiceImpl>((container) => container.resolve(GasServiceImpl)),
  });
});

afterAll(() => {
  container.dispose();
});

it('getGasinfo', async () => {
  const GasService = container.resolve<GasServiceImpl>('GasService');
  const res = await GasService.getGasInfo(networkInfo);
  console.log('gaslimit', formatEther(res.gasLimit), 'gasprice', formatEther(res.gasPrice));
});
