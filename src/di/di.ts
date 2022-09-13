/**
 * Dependency Injection
 * import this file from the App(Entry) componet to register di modules
 */
import { container, instancePerContainerCachingFactory } from 'tsyringe';

import { WalletServiceImpl } from '@@domain/wallet/WalletService';

import { WalletRepositoryImpl } from '../domain/wallet/WalletRepository';

container.register('WalletRepository', {
  useFactory: instancePerContainerCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
});

container.register('WalletService', {
  useFactory: instancePerContainerCachingFactory<WalletServiceImpl>((container) => container.resolve(WalletServiceImpl)),
});
