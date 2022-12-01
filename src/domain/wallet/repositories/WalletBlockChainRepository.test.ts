import { container, instanceCachingFactory } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import { ETH_TOKENLIST, BSC_TOKENLIST, TestData } from './TestData';
import { EthersContractImpl, ContractRepository } from './WalletBlockChainRepository';

beforeAll(() => {
  container.register('EthersContractRepository', {
    useFactory: instanceCachingFactory<EthersContractImpl>((container) => container.resolve(EthersContractImpl)),
  });
});

afterAll(() => {
  container.dispose();
});

const findToken = (tokenList: TokenDto[], symbol: string) => {
  return tokenList.find((token) => token.symbol === symbol);
};

it('constructs correctly', () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  expect(contractRepository).toBeDefined();
});

it('get eth balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');

  const balance = await contractRepository.getBalance({
    selectedWalletPrivateKey: TestData.selectedWalletPrivateKey,
    rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
  });
  expect(balance).toBe('0.399914121574889052');
});

it('get mvl balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: findToken(ETH_TOKENLIST, 'MVL')?.contractAddress ?? '',
    abi: abiERC20,
    address: TestData.ethAddress,
    rpcUrl: getNetworkConfig('GOERLI').rpcUrl,
  });
  expect(balance).toBe('1000.123456789000001');
});

it('get bsc balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getBalance({
    selectedWalletPrivateKey: TestData.selectedWalletPrivateKey,
    rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
  });
  expect(balance).toBe('0.5');
});

it('get bMvl balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: findToken(BSC_TOKENLIST, 'bMVL')?.contractAddress ?? '',
    abi: abiERC20,
    address: TestData.bscAddress,
    rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
  });
  expect(balance).toBe('0.0');
});

it('get BTCB balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: findToken(BSC_TOKENLIST, 'BTCB')?.contractAddress ?? '',
    abi: abiERC20,
    address: TestData.bscAddress,
    rpcUrl: getNetworkConfig('BSC_TESTNET').rpcUrl,
  });
  expect(balance).toBe('0.0');
});
