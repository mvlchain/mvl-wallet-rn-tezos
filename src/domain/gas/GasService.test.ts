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
