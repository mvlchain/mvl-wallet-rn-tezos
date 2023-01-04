import { container, instanceCachingFactory } from 'tsyringe';

import { abiERC20 } from '@@constants/contract/abi/abiERC20';
import { getNetworkConfig } from '@@constants/network.constant';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { TokenDto } from '@@store/token/tokenPersistStore.type';

import { ETH_TOKENLIST, BSC_TOKENLIST, TestData } from '../TestData';

import { EthersRepository } from './EthersRepository';
import { TezosRepository } from './TezosRepository';
import { IBlockChainRepository } from './WalletBlockChaiRepository.type';

beforeAll(() => {
  container.register('EvmJsonRpcProviderHolder', {
    useFactory: instanceCachingFactory<EvmJsonRpcProviderHolder>((container) => container.resolve(EvmJsonRpcProviderHolder)),
  });
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
// it('get Ethers metadata', async () => {
//   const blockchainRepository = container.resolve<IBlockChainRepository>('EthersRepository');
//   blockchainRepository.getTokenMetadata(getNetworkConfig('GOERLI').rpcUrl, findToken(ETH_TOKENLIST, 'MVL')?.contractAddress ?? '', abiERC20);
// });
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
//   it('get tezos metadata', async () => {
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS_GHOSTNET').rpcUrl, 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS_GHOSTNET').rpcUrl, 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS_GHOSTNET').rpcUrl, 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS').rpcUrl, 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS').rpcUrl, 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV');
// blockchainRepository.getTokenMetadata(getNetworkConfig('TEZOS').rpcUrl, 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb');
// });
//   it('get tezos balance', async () => {
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await blockchainRepository.getBalance({
//       selectedWalletPrivateKey: TestData.tezosSelectedWalletPrivateKey,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//       decimals: 6,
//     });
//     expect(balance).toBe('1598.919713');
//   });
//   it('get tzBTC(fa1.2) balance', async () => {
//     const fa1_2TokenContractAddress = 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz'; // tzBTC
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await blockchainRepository.getContractBalance({
//       contractAddress: fa1_2TokenContractAddress,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//       address: TestData.tezosAddress,
//       standardType: 'fa1.2',
//       decimals: 8,
//     });
//     expect(balance).toBe('0.00391686');
//   });
//   it('get kUSD(fa1.2) balance', async () => {
//     const fa1_2TokenContractAddress = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1'; // kUSD
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await blockchainRepository.getContractBalance({
//       contractAddress: fa1_2TokenContractAddress,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//       address: TestData.tezosAddress,
//       standardType: 'fa1.2',
//       decimals: 18,
//     });
//     expect(balance).toBe('1154.708485994096640983');
//   });
//   it('get QUIPU(fa2) balance', async () => {
//     const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
//     const blockchainRepository = container.resolve<IBlockChainRepository>('TezosRepository');
//     const balance = await blockchainRepository.getContractBalance({
//       contractAddress: fa2TokenContractAddress,
//       rpcUrl: getNetworkConfig('TEZOS_GHOSTNET').rpcUrl,
//       address: TestData.tezosAddress,
//       standardType: 'fa2',
//       decimals: 6,
//     });
//     expect(balance).toBe('0.010878');
//   });
// });

// 기존 작성해주신 테스트 코드 살려오기

// describe('Tezos base methods', () => {
//   jest.setTimeout(50000);

//   const tzDestAddress = 'tz1S3m5Awdixhy5puaXT3w83QqD77rP3EqGT';

//   it('create a wallet with mnemonic phrase and tezos', async () => {
//     const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
//     const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
//     expect(mnemonicToSeed.length).toBe(64);
//     const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
//     const tzAddress0 = keyPair.pkh;
//     expect(tzAddress0).toBe('tz1iACqtM523s3R1da5JSTXN2hBbAFYSWE4o');

//     // get Tezos coin balance
//     const tzBalance = await Tezos.tz.getBalance(tzAddress0);
//     // console.log(tzBalance.toFixed());

//     // fa2.0 token balance
//     const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
//     const fa2TokenContract = await Tezos.wallet.at(fa2TokenContractAddress);
//     const balance = await fa2TokenContract.views
//       .balance_of([
//         {
//           owner: tzAddress0,
//           token_id: 0,
//         },
//       ])
//       .read();
//     const fa2BalanceRes = JSON.parse(JSON.stringify(balance));
//     // const fa2BalanceRes = [
//     //   {
//     //     request: { owner: 'tz1SPsMFyXYdn7n3483AULz72kwn36tAP9vX', token_id: '0' },
//     //     balance: '4410043',
//     //   },
//     // ];
//     console.log(fa2BalanceRes);

//     const fa2BalanceStr = fa2BalanceRes[0].balance;
//     console.log(fa2BalanceStr);
//     // 4410043 -> 4.410043 (decimal 6)

//     // fa1.2
//     // const fa1_2TokenContractAddress = 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz'; // tzBTC
//     const fa1_2TokenContractAddress = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1'; // kUSD
//     // const fa1_2TokenContractAddress = 'KT1QzmrMs1xUXZJ8TPAoDEFaKC6w56RfdLWo'; // USDtz

//     const fa1_2TokenContract = await Tezos.wallet.at(fa1_2TokenContractAddress, compose(tzip12, tzip16));
//     const fa1Balance = await fa1_2TokenContract.views.getBalance(tzAddress0).read();
//     console.log(fa1Balance.toFixed());
//     // 195123 -> 0.0019512 (decimal 8)
//     // 33049843457497740 -> 0.0330498 (decimal 18)
//   });

//   it('send tezos', async () => {
//     const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
//     const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
//     expect(mnemonicToSeed.length).toBe(64);
//     const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
//     await importKey(Tezos, keyPair.sk);

//     const txHash = await Tezos.wallet
//       .transfer({
//         to: tzDestAddress,
//         amount: 0.1, // in TEZ unit (not muTez)
//       })
//       .send()
//       .then((op) => op.confirmation(1).then(() => op.opHash));
//     console.log(`txHash: ${txHash}`);
//   });

//   it('send fa2 token', async () => {
//     jest.setTimeout(50000);

//     const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
//     Tezos.addExtension(new Tzip12Module());
//     const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
//     expect(mnemonicToSeed.length).toBe(64);
//     const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
//     const tzAddress0 = keyPair.pkh;
//     await importKey(Tezos, keyPair.sk);

//     const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
//     const fa2TokenContract = await Tezos.wallet.at(fa2TokenContractAddress, tzip12);
//     console.log('before transfer');
//     const metadata = await fa2TokenContract.tzip12().getTokenMetadata(0);
//     console.log(`metadata`, metadata);
//     const tokenId = metadata.token_id;
//     const decimals = metadata.decimals;
//     const tokenAmount = '1';
//     const pennyAmount = new Decimal(tokenAmount).mul(Decimal.pow(10, decimals)).toFixed();
//     const op = await fa2TokenContract.methods
//       .transfer([{ from_: tzAddress0, txs: [{ to_: tzDestAddress, token_id: tokenId, amount: pennyAmount }] }])
//       .send();
//     console.log('op send finished');
//     await op.confirmation();
//     console.log(op.opHash);
//   });

//   it('send fa1.2 token', async () => {
//     return;
//     const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
//     Tezos.addExtension(new Tzip12Module());
//     const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
//     expect(mnemonicToSeed.length).toBe(64);
//     const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
//     const tzAddress0 = keyPair.pkh;
//     await importKey(Tezos, keyPair.sk);

//     const fa1_2TokenContractAddress = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1'; // kUSD
//     const fa1_2TokenContract = await Tezos.wallet.at(fa1_2TokenContractAddress, tzip12);
//     console.log('before transfer');
//     const metadata = await fa1_2TokenContract.tzip12().getTokenMetadata(0);
//     console.log(`metadata`, metadata);
//     const decimals = metadata.decimals;
//     const tokenAmount = '0.01';
//     const pennyAmount = new Decimal(tokenAmount).mul(Decimal.pow(10, decimals)).toFixed();
//     const op = await fa1_2TokenContract.methods.transfer(tzAddress0, tzDestAddress, pennyAmount).send();
//     console.log('op send finished');
//     await op.confirmation();
//     console.log(op.opHash);
//   });
// });
