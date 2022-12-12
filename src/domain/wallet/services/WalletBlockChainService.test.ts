import ShareStore from '@tkey/common-types/src/base/ShareStore';
import { container, instanceCachingFactory } from 'tsyringe';

import { AuthProvider } from '@@constants/auth.constant';
import { NetworkId, Network } from '@@constants/network.constant';
import { KeyClient, PostboxKeyHolder } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { WalletDto } from '@@domain/model/WalletDto';

import { EthersWalletClient } from '../clients/EthersWalletClient';
import { TezosClient } from '../clients/TezosClient';
import { IWallet, IWalletClient } from '../clients/WalletClient.type';
import { BSC_TOKENLIST, ETH_TOKENLIST, TEZOS_TOKENLIST } from '../repositories/TestData';
import { WalletRepositoryImpl } from '../repositories/WalletRepository';
import { EthersRepository } from '../repositories/blockchainRepositories/EthersRepository';
import { TezosRepository } from '../repositories/blockchainRepositories/TezosRepository';

import { WalletBlockChainService } from './WalletBlockChainService';
import { WalletService } from './WalletService';
import { IGetWalletInfoParam, ICreateWalletBody, IGetWalletPKeyParam } from './WalletService.type';

export class KeyClientImpl implements KeyClient {
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
  checkDevice!: () => boolean;
  checkSignedUp!: () => Promise<boolean>;
  checkServer!: () => Promise<boolean>;
  checkSet!: () => boolean;
  checkPincode!: () => Promise<boolean>;
  getPrivateKey = async () => 'f8b52a72b38b08d1a2a838ab9bad0cdb39cae8bf63c238d43a87d52c68a3de24';
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
}

class WalletServiceImpl implements WalletService {
  extendedPublicKeyByCredentials(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signMessageByExtendedKey(data: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getWalletInfo = async (param: IGetWalletInfoParam) => {
    return {
      address: 'tz1XmNmcHRP7J7ZHurpUy4ZbjE3dpNT9chtS',
      privateKey: 'edskS252S8sZYXuai5qRuqxx1BsNaRdNdgZt3VmJdmPEZAE3kuBdG3KNVjWctV2Zf5mXz4nnoEDQRx9bXYjGqHUsLCkbkJYeVh',
      publicKey: '',
    };
  };
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
});

afterAll(() => {
  container.dispose();
});

it('get pkey', async () => {
  const keyClient = container.resolve<KeyClient>('KeyClient');
  const pkey = await keyClient.getPrivateKey();
  expect(pkey).toBe('f8b52a72b38b08d1a2a838ab9bad0cdb39cae8bf63c238d43a87d52c68a3de24');
});

// it('get eth balance', async () => {
//   const blockChainService = container.resolve<WalletBlockChainService>('WalletBlockChainService');
//   const ethBalance = await blockChainService.getBalanceFromNetwork(0, 'ETHEREUM', ETH_TOKENLIST);
//   expect(ethBalance).toStrictEqual({ ETH: '0.0', MVL: '0.0' });
// });

// it('get bsc balance', async () => {
//   const blockChainService = container.resolve<WalletBlockChainService>('WalletBlockChainService');
//   const bscBalance = await blockChainService.getBalanceFromNetwork(0, 'BSC', BSC_TOKENLIST);
//   expect(bscBalance).toStrictEqual({ bMVL: '0.0', BNB: '0.0', BTCB: '0.0' });
// });

// it('get xtz balance', async () => {
//   const blockChainService = container.resolve<WalletBlockChainService>('WalletBlockChainService');
//   const xtzBalance = await blockChainService.getBalanceFromNetwork(0, 'TEZOS', TEZOS_TOKENLIST);
//   expect(xtzBalance).toStrictEqual({ XTZ: '2101' });
// });
