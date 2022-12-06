import { container, instanceCachingFactory } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import { ETH_TOKENLIST, BSC_TOKENLIST, TestData } from '../TestData';

import { EthersRepository } from './EthersRepository';
import { TezosRepository } from './TezosRepository';
import { IBlockChainRepository } from './WalletBlockChaiRepository.type';

beforeAll(() => {
  container.register('EthersRepository', {
    useFactory: instanceCachingFactory<EthersRepository>((container) => container.resolve(EthersRepository)),
  });
  container.register('TezosRepository', {
    useFactory: instanceCachingFactory<TezosRepository>((container) => container.resolve(TezosRepository)),
  });
});

afterAll(() => {
  container.dispose();
});

const findToken = (tokenList: TokenDto[], symbol: string) => {
  return tokenList.find((token) => token.symbol === symbol);
};

// describe('get Ethers balance', () => {
it('get eth balance', async () => {
  const contractRepository = container.resolve<IBlockChainRepository>('EthersRepository');
  const balance = await contractRepository.getBalance({
    selectedWalletPrivateKey: TestData.ethersSelectedWalletPrivateKey,
    rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
  });
  expect(balance).toBe('0.599914121574889052');
});
// it('get mvl balance', async () => {
//   const contractRepository = container.resolve<ContractRepository>('EthersRepository');
//   const balance = await contractRepository.getContractBalance({
//     contractAddress: findToken(ETH_TOKENLIST, 'MVL')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.ethAddress,
//     rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
//   });
//   expect(balance).toBe('1000.123456789000001');
// });
// it('get bsc balance', async () => {
//   const contractRepository = container.resolve<ContractRepository>('EthersRepository');
//   const balance = await contractRepository.getBalance({
//     selectedWalletPrivateKey: TestData.ethersSelectedWalletPrivateKey,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.5');
// });
// it('get bMvl balance', async () => {
//   const contractRepository = container.resolve<ContractRepository>('EthersRepository');
//   const balance = await contractRepository.getContractBalance({
//     contractAddress: findToken(BSC_TOKENLIST, 'bMVL')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.bscAddress,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.0');
// });
// it('get BTCB balance', async () => {
//   const contractRepository = container.resolve<ContractRepository>('EthersRepository');
//   const balance = await contractRepository.getContractBalance({
//     contractAddress: findToken(BSC_TOKENLIST, 'BTCB')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.bscAddress,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.0');
// });
// });

// describe('get Tezos balance', () => {
//   it('get tezos balance', async () => {
//     const contractRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await contractRepository.getBalance({
//       selectedWalletPrivateKey: TestData.tezosSelectedWalletPrivateKey,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//     });
//     expect(balance).toBe('2101');
//   });
// });
