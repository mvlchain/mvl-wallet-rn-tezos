import { ShareStore } from '@tkey/common-types';
import { container, instanceCachingFactory } from 'tsyringe';

import { AuthProvider } from '@@constants/auth.constant';
import { KeyClient, PostboxKeyHolder } from '@@domain/auth/clients/KeyClient';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { EthersContractImpl } from '@@domain/wallet/repositories/WalletBlockChainRepository';

import { WalletRepositoryImpl } from '../repositories/WalletRepository';

import { EthersContractServiceImpl } from './WalletBlockChainService';
import { WalletServiceImpl } from './WalletService';

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
beforeAll(() => {
  container.register('EthersContractRepository', {
    useFactory: instanceCachingFactory<EthersContractImpl>((container) => container.resolve(EthersContractImpl)),
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
    useFactory: instanceCachingFactory<EthersContractServiceImpl>((container) => container.resolve(EthersContractServiceImpl)),
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

it('get eth balance', async () => {
  const ethService = container.resolve<EthersContractServiceImpl>('WalletBlockChainService');
  const ethBalance = await ethService.getBalanceFromNetwork(0, 'ETHEREUM');
  expect(ethBalance).toStrictEqual({ ETH: '0.0', MVL: '0.0' });
});

it('get bsc balance', async () => {
  const ethService = container.resolve<EthersContractServiceImpl>('WalletBlockChainService');
  const bscBalance = await ethService.getBalanceFromNetwork(0, 'BSC');
  expect(bscBalance).toStrictEqual({ bMVL: '0.0', BNB: '0.0', BTCB: '0.0' });
});
