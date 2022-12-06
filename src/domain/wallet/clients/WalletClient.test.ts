// @ts-ignore
import { container, instanceCachingFactory } from 'tsyringe';

import { EhtersClient } from './EthersClient';
import { TezosClient } from './TezosClient';

const PRIVATE_KEY = '28ce6e859f0e69668a9e6cd12bc7ab0d1f2c4e3150432e4141b6adbadecc079c';
const MNEMONIC =
  // eslint-disable-next-line max-len
  'churn inflict pause dignity track rebuild clerk snow spell funny turn boss version check shed anchor comic anxiety horror fork pupil gravity bunker neck';

const ethAddress = '0xC2981a878baA621E22799C31265aeaAFB7f74c50';
const tezosAddress = 'tz1XmNmcHRP7J7ZHurpUy4ZbjE3dpNT9chtS';

beforeAll(async () => {
  container.register('EthersClient', {
    useFactory: instanceCachingFactory<EhtersClient>((container) => container.resolve(EhtersClient)),
  });
  container.register('TezosClient', {
    useFactory: instanceCachingFactory<TezosClient>((container) => container.resolve(TezosClient)),
  });
});

afterAll(() => {
  container.dispose();
});

describe('Ether base methods', () => {
  it('create a Ethereum wallet with string type entropy, no hex prefix, no zero padding', async () => {
    const ethersClient = container.resolve(EhtersClient);
    const wallet = await ethersClient.createWalletWithEntropy(PRIVATE_KEY, 0);

    expect(wallet.address).toBe(ethAddress);
  });

  it('create a Ethereum wallet with string type entropy, hex prefix, no zero padding', async () => {
    const entropy = `0x${PRIVATE_KEY}`;
    const ethersClient = container.resolve(EhtersClient);
    const wallet = await ethersClient.createWalletWithEntropy(entropy, 0);

    expect(wallet.address).toBe(ethAddress);
  });

  // it('create a Ethereum wallet with string type entropy, hex prefix, zero padding', async () => {
  //   const entropy = `0x0${PRIVATE_KEY}`;
  //   const ethersClient = container.resolve(EhtersClient);
  //   const wallet = await ethersClient.createWalletWithEntropy(entropy, 0);

  //   expect(wallet.address).toBe(ethAddress);
  // });

  it('create a Ethereum wallet with mnemonic phrase and derivation path', async () => {
    const ethersClient = container.resolve(EhtersClient);
    const wallet = await ethersClient.createWalletWithMnemonic(MNEMONIC, 0);

    expect(wallet.address).toBe(ethAddress);
  });
});

describe('Tezos base methods', () => {
  jest.setTimeout(50000);

  it('create a Tezos wallet with string type entropy, no hex prefix, no zero padding', async () => {
    const tezosClient = container.resolve(TezosClient);
    const wallet = await tezosClient.createWalletWithEntropy(PRIVATE_KEY, 0);

    expect(wallet.address).toBe(tezosAddress);
  });

  it('create a Tezos wallet with string type entropy, hex prefix, no zero padding', async () => {
    const entropy = `0x${PRIVATE_KEY}`;
    const tezosClient = container.resolve(TezosClient);
    const wallet = await tezosClient.createWalletWithEntropy(entropy, 0);

    expect(wallet.address).toBe(tezosAddress);
  });

  it('create a Tezos wallet with mnemonic phrase and derivation path', async () => {
    const tezosClient = container.resolve(TezosClient);
    const wallet = await tezosClient.createWalletWithMnemonic(MNEMONIC, 0);

    expect(wallet.address).toBe(tezosAddress);
  });
});
