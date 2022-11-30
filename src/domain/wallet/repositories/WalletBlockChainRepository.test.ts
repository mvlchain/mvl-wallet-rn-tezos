import { container, instanceCachingFactory } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { MVL_GOERLI, B_MVL_STAGE, BTCB_STAGE } from '@@constants/contract/contract.constant';

import { TestData } from './TestData';
import { EthersContractImpl, ContractRepository } from './WalletBlockChainRepository';

const TEST_ETH_RPC_URL = 'https://goerli.infura.io/v3/***REMOVED***';
const TEST_BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';

beforeAll(() => {
  container.register('EthersContractRepository', {
    useFactory: instanceCachingFactory<EthersContractImpl>((container) => container.resolve(EthersContractImpl)),
  });
});

afterAll(() => {
  container.dispose();
});

// const contractRepository: ContractRepository = new EthersContractImpl();

it('constructs correctly', () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  expect(contractRepository).toBeDefined();
});

it('get eth balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');

  const balance = await contractRepository.getBalance({
    selectedWalletPrivateKey: TestData.selectedWalletPrivateKey,
    rpcUrl: TEST_ETH_RPC_URL,
  });
  expect(balance).toBe('0.199914121574889052');
});

it('get mvl balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: MVL_GOERLI.contractAddress,
    abi: abiERC20,
    address: TestData.ethAddress,
    rpcUrl: TEST_ETH_RPC_URL,
  });
  expect(balance).toBe('1000.123456789000001');
});

it('get bsc balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getBalance({
    selectedWalletPrivateKey: TestData.selectedWalletPrivateKey,
    rpcUrl: TEST_BSC_RPC_URL,
  });
  expect(balance).toBe('0.5');
});

it('get bMvl balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: B_MVL_STAGE.contractAddress,
    abi: abiERC20,
    address: TestData.bscAddress,
    rpcUrl: TEST_BSC_RPC_URL,
  });
  expect(balance).toBe('0.0');
});

it('get BTCB balance', async () => {
  const contractRepository = container.resolve<ContractRepository>('EthersContractRepository');
  const balance = await contractRepository.getContractBalance({
    contractAddress: BTCB_STAGE.contractAddress,
    abi: abiERC20,
    address: TestData.bscAddress,
    rpcUrl: TEST_BSC_RPC_URL,
  });
  expect(balance).toBe('0.0');
});
