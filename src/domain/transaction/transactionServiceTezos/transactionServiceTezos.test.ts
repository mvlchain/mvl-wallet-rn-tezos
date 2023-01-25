import ShareStore from '@tkey/common-types/src/base/ShareStore';
import { container, instanceCachingFactory } from 'tsyringe';

import { AuthProvider } from '@@constants/auth.constant';
import { NETWORK, NetworkId, Network } from '@@constants/network.constant';
import { KeyClient, PostboxKeyHolder } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { WalletDto } from '@@domain/model/WalletDto';
import { EthersWalletClient } from '@@domain/wallet/clients/EthersWalletClient';
import { TezosClient } from '@@domain/wallet/clients/TezosClient';
import { IWalletClient, IWallet } from '@@domain/wallet/clients/WalletClient.type';
import { WalletRepositoryImpl } from '@@domain/wallet/repositories/WalletRepository';
import { EthersRepository } from '@@domain/wallet/repositories/blockchainRepositories/EthersRepository';
import { TezosRepository } from '@@domain/wallet/repositories/blockchainRepositories/TezosRepository';
import { WalletBlockChainService } from '@@domain/wallet/services/WalletBlockChainService';
import { WalletService } from '@@domain/wallet/services/WalletService';
import { ICreateWalletBody, IGetWalletPKeyParam, IGetWalletInfoParam } from '@@domain/wallet/services/WalletService.type';

import { TransactionServiceTezos } from './TransactionServiceTezos';
class KeyClientImpl implements KeyClient {
  postboxKeyHolder: PostboxKeyHolder | null;
  serverShare: ShareStore | null;
  deviceShare: ShareStore | null;
  deviceShareIndex: string | null;
  constructor() {
    this.postboxKeyHolder = null;
    this.deviceShare = null;
    this.serverShare = null;
    this.deviceShareIndex = null;
  }
  triggerSocialSignIn!: (provider: AuthProvider, isTemp?: boolean | undefined) => Promise<PostboxKeyHolder>;
  checkDevice!: () => Promise<boolean>;
  checkSignedUp!: () => Promise<boolean>;
  checkServer!: () => Promise<boolean>;
  checkSet!: () => boolean;
  checkPincode!: () => Promise<boolean>;
  getPrivateKey = async () => 'f8b52a72b38b08d1a2a838ab9bad0cdb39cae8bf63c238d43a87d52c68a3de24';
  getExtendPublicKey!: () => Promise<string>;
  setDevice!: (pincode: string) => Promise<void>;
  setServer!: () => Promise<void>;
  setKeyFromDevice!: () => Promise<void>;
  setKeyByMnemonic!: (mnemonic: string) => Promise<void>;
  setKeyByServer!: () => Promise<void>;
  generateKey!: () => Promise<void>;
  generateMnemonic!: () => Promise<string>;
  getMnemonicByPkey!: () => string;
  generateDevice!: () => Promise<string>;
  updateServer!: () => Promise<void>;
  restoreServer!: () => Promise<void>;
  delete!: () => Promise<void>;
  signOut!: () => void;
  findDeviceShareByServerShare!: () => void;
  compareKey!: (postboxKey: string) => Promise<boolean>;
  getDeviceProvider!: () => Promise<AuthProvider>;
}

class WalletServiceImpl implements WalletService {
  extendedPublicKeyByCredentials(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signMessageByExtendedKey(data: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getWalletInfo = async (param: IGetWalletInfoParam): Promise<IWallet> => {
    return {
      address: 'tz1XmNmcHRP7J7ZHurpUy4ZbjE3dpNT9chtS',
      privateKey: 'edskS252S8sZYXuai5qRuqxx1BsNaRdNdgZt3VmJdmPEZAE3kuBdG3KNVjWctV2Zf5mXz4nnoEDQRx9bXYjGqHUsLCkbkJYeVh',
      publicKey: '',
    };
  };
  getWalletInfoFromStore(param: IGetWalletInfoParam): IWallet {
    return {
      address: 'tz1XmNmcHRP7J7ZHurpUy4ZbjE3dpNT9chtS',
      privateKey: 'edskS252S8sZYXuai5qRuqxx1BsNaRdNdgZt3VmJdmPEZAE3kuBdG3KNVjWctV2Zf5mXz4nnoEDQRx9bXYjGqHUsLCkbkJYeVh',
      publicKey: '',
    };
  }

  getWalletList(networkId: NetworkId): Promise<WalletDto[]> {
    throw new Error('Method not implemented.');
  }
  createWallet(
    body: ICreateWalletBody
  ): Promise<{ id: string; address: string; network: 'ETHEREUM' | 'BSC' | 'XTZ' | 'BITCOIN'; index: number; name: string }> {
    throw new Error('Method not implemented.');
  }
  getWalletPKey(param: IGetWalletPKeyParam): Promise<string> {
    throw new Error('Method not implemented.');
  }
  setWalletClient(network: Network): IWalletClient {
    throw new Error('Method not implemented.');
  }
}

beforeAll(() => {
  container.register('EthersWalletClient', {
    useFactory: instanceCachingFactory<EthersWalletClient>((container) => container.resolve(EthersWalletClient)),
  });
  container.register('TezosClient', {
    useFactory: instanceCachingFactory<TezosClient>((container) => container.resolve(TezosClient)),
  });
  container.register('EthersRepository', {
    useFactory: instanceCachingFactory<EthersRepository>((container) => container.resolve(EthersRepository)),
  });

  container.register('TezosRepository', {
    useFactory: instanceCachingFactory<TezosRepository>((container) => container.resolve(TezosRepository)),
  });

  container.register('WalletRepository', {
    useFactory: instanceCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
  });

  container.register('RootKeyRepository', {
    useFactory: instanceCachingFactory<RootKeyRepositoryImpl>((container) => container.resolve(RootKeyRepositoryImpl)),
  });

  container.register('WalletService', {
    useFactory: instanceCachingFactory<WalletServiceImpl>((container) => container.resolve(WalletServiceImpl)),
  });

  container.register('KeyClient', {
    useFactory: instanceCachingFactory<KeyClientImpl>((container) => container.resolve(KeyClientImpl)),
  });
  container.register('WalletBlockChainService', {
    useFactory: instanceCachingFactory<WalletBlockChainService>((container) => container.resolve(WalletBlockChainService)),
  });

  container.register('EvmJsonRpcProviderHolder', {
    useFactory: instanceCachingFactory<EvmJsonRpcProviderHolder>((container) => container.resolve(EvmJsonRpcProviderHolder)),
  });
  container.register('TransactionServiceTezos', {
    useFactory: instanceCachingFactory<TransactionServiceTezos>((container) => container.resolve(TransactionServiceTezos)),
  });
});

afterAll(() => {
  container.dispose();
});

const from = 'tz1XmNmcHRP7J7ZHurpUy4ZbjE3dpNT9chtS';
const to = 'tz1TbtL8o42styDAngvPkKBb6wpgTnT71m3t';
const contractAddressFa12 = 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz';
const contractAddressFa2 = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c';

it('get transferParam when send fa12 token', async () => {
  const transactionserviceTezos = container.resolve<TransactionServiceTezos>('TransactionServiceTezos');
  const transferParam = await transactionserviceTezos.getTransferParam({
    selectedNetwork: NETWORK.TEZOS_GHOSTNET,
    selectedWalletIndex: 0,
    to,
    amount: 1,
    contractAddress: contractAddressFa12,
  });

  expect(transferParam).toEqual({
    to: contractAddressFa12,
    amount: 0,
    fee: undefined,
    source: undefined,
    gasLimit: undefined,
    storageLimit: undefined,
    mutez: false,
    parameter: {
      entrypoint: 'transfer',
      value: {
        prim: 'Pair',
        args: [{ string: from }, { prim: 'Pair', args: [{ string: to }, { int: '1' }] }],
      },
    },
  });
});

it('get transferParam when send fa2 token', async () => {
  const transactionserviceTezos = container.resolve<TransactionServiceTezos>('TransactionServiceTezos');
  const transferParam = await transactionserviceTezos.getTransferParam({
    selectedNetwork: NETWORK.TEZOS_GHOSTNET,
    selectedWalletIndex: 0,
    to,
    amount: 1,
    contractAddress: contractAddressFa2,
  });

  expect(transferParam).toEqual({
    to: contractAddressFa2,
    amount: 0,
    fee: undefined,
    source: undefined,
    gasLimit: undefined,
    storageLimit: undefined,
    mutez: false,
    parameter: {
      entrypoint: 'transfer',
      value: [
        {
          prim: 'Pair',
          args: [{ string: from }, [{ prim: 'Pair', args: [{ string: to }, { prim: 'Pair', args: [{ int: '0' }, { int: '1' }] }] }]],
        },
      ],
    },
  });
});
