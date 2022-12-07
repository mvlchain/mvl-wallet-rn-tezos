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

it('is the same singleton instnace', () => {
  const ethersRepository1 = container.resolve<EthersRepository>('EthersRepository');
  const ethersRepository2 = container.resolve<EthersRepository>('EthersRepository');
  expect(ethersRepository1).toBe(ethersRepository2);
});

// describe('get Ethers balance', () => {
// it('get eth balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   const balance = await blockchainRepository.getBalance({
//     selectedWalletPrivateKey: TestData.ethersSelectedWalletPrivateKey,
//     rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
//   });
//   expect(balance).toBe('0.599914121574889052');
// });
// it('get mvl balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   const balance = await blockchainRepository.getContractBalance({
//     contractAddress: findToken(ETH_TOKENLIST, 'MVL')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.ethAddress,
//     rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
//   });
//   expect(balance).toBe('1000.123456789000001');
// });
// it('get bsc balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   const balance = await blockchainRepository.getBalance({
//     selectedWalletPrivateKey: TestData.ethersSelectedWalletPrivateKey,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.5');
// });
// it('get bMvl balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   const balance = await blockchainRepository.getContractBalance({
//     contractAddress: findToken(BSC_TOKENLIST, 'bMVL')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.bscAddress,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.0');
// });
// it('get BTCB balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   const balance = await blockchainRepository.getContractBalance({
//     contractAddress: findToken(BSC_TOKENLIST, 'BTCB')?.contractAddress ?? '',
//     abi: abiERC20,
//     address: TestData.bscAddress,
//     rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
//   });
//   expect(balance).toBe('0.0');
// });
// });

// describe('get Tezos balance', () => {
// it('get tezos balance', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//   const balance = await blockchainRepository.getBalance({
//     selectedWalletPrivateKey: TestData.tezosSelectedWalletPrivateKey,
//     rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//   });
//   expect(balance).toBe('2100.998562');
// });
// it('get USDtz(fa1.2) balance', async () => {
//   const fa1_2TokenContractAddress = 'KT1QzmrMs1xUXZJ8TPAoDEFaKC6w56RfdLWo'; // USDtz
//   const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//   const balance = await blockchainRepository.getContractBalance({
//     contractAddress: fa1_2TokenContractAddress,
//     rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//     address: TestData.tezosAddress,
//     standardType: 'fa1.2',
//   });
//   expect(balance).toBe('0');
// });
//   it('get QUIPU(fa2) balance', async () => {
//     const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await blockchainRepository.getContractBalance({
//       contractAddress: fa2TokenContractAddress,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//       address: TestData.tezosAddress,
//       standardType: 'fa2',
//     });
//     expect(balance).toBe('0');
//   });
// });
