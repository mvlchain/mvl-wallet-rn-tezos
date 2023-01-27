import { container, instanceCachingFactory } from 'tsyringe';

import { KeyClientImpl } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtilImpl } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepositoryImpl } from '@@domain/auth/repositories/DeviceShareRepository';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepositoryImpl } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepositoryImpl } from '@@domain/auth/repositories/TorusShareRepository';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { EthersWalletClient } from '@@domain/wallet/clients/EthersWalletClient';
import { TezosClient } from '@@domain/wallet/clients/TezosClient';
import { WalletRepositoryImpl } from '@@domain/wallet/repositories/WalletRepository';
import { WalletServiceImpl } from '@@domain/wallet/services/WalletService';

import { TransactionServiceEthers } from './TransactionServiceEthers';

beforeAll(() => {
  container.register('EvmJsonRpcProviderHolder', {
    useFactory: instanceCachingFactory<EvmJsonRpcProviderHolder>((container) => container.resolve(EvmJsonRpcProviderHolder)),
  });
  container.register('TransactionServiceEthers', {
    useFactory: instanceCachingFactory<TransactionServiceEthers>((container) => container.resolve(TransactionServiceEthers)),
  });
  container.register('WalletService', {
    useFactory: instanceCachingFactory<WalletServiceImpl>((container) => container.resolve(WalletServiceImpl)),
  });
  container.register('WalletRepository', {
    useFactory: instanceCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
  });
  container.register('RootKeyRepository', {
    useFactory: instanceCachingFactory<RootKeyRepositoryImpl>((container) => container.resolve(RootKeyRepositoryImpl)),
  });
  container.register('KeyClient', {
    useFactory: instanceCachingFactory<KeyClientImpl>((container) => container.resolve(KeyClientImpl)),
  });
  container.register('DeviceShareRepository', {
    useFactory: instanceCachingFactory<DeviceShareRepositoryImpl>((container) => container.resolve(DeviceShareRepositoryImpl)),
  });
  container.register('ServerShareRepository', {
    useFactory: instanceCachingFactory<ServerShareRepositoryImpl>((container) => container.resolve(ServerShareRepositoryImpl)),
  });
  container.register('TorusShareRepository', {
    useFactory: instanceCachingFactory<TorusShareRepositoryImpl>((container) => container.resolve(TorusShareRepositoryImpl)),
  });
  container.register('KeyClientUtil', {
    useFactory: instanceCachingFactory<KeyClientUtilImpl>((container) => container.resolve(KeyClientUtilImpl)),
  });
  container.register('EthersWalletClient', {
    useFactory: instanceCachingFactory<EthersWalletClient>((container) => container.resolve(EthersWalletClient)),
  });
  container.register('TezosClient', {
    useFactory: instanceCachingFactory<TezosClient>((container) => container.resolve(TezosClient)),
  });
});

afterAll(() => {
  container.dispose();
});

it('is the same singleton instnace', () => {
  const transactionServiceEthers1 = container.resolve<TransactionServiceEthers>('TransactionServiceEthers');
  const transactionServiceEthers2 = container.resolve<TransactionServiceEthers>('TransactionServiceEthers');
  expect(transactionServiceEthers1).toBe(transactionServiceEthers2);
});

// describe('get balance in transaction function', () => {
//   it('decode function data', async () => {
//     const transactionServiceEthers = container.resolve<TransactionServiceEthers>('TransactionServiceEthers');
//     transactionServiceEthers.decodeFunctionData(
//       'transfer',
//       '0xa9059cbb000000000000000000000000e3587f0a8da40fa3e33c4141dd4b08241222460f00000000000000000000000000000000000000000000021e27c1806e59a40000'
//     );
//   });
// });
