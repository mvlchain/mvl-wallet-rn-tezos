/**
 * Dependency Injection
 * import this file from the App(Entry) componet to register di modules
 */
import { container, instancePerContainerCachingFactory } from 'tsyringe';

import { AuthServiceImpl } from '@@domain/auth/AuthService';
import { KeyClientImpl } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtilImpl } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepositoryImpl } from '@@domain/auth/repositories/DeviceShareRepository';
import { RTNSettingsRepositoryImpl } from '@@domain/auth/repositories/RTNSettingsRepository';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepositoryImpl } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepositoryImpl } from '@@domain/auth/repositories/TorusShareRepository';
import { UIServiceImpl } from '@@domain/auth/services/UIService';
import { WalletRepositoryImpl } from '@@domain/wallet/repositories/WalletRepository';
import { WalletServiceImpl } from '@@domain/wallet/services/WalletService';

container.register('WalletRepository', {
  useFactory: instancePerContainerCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
});
container.register('WalletService', {
  useFactory: instancePerContainerCachingFactory<WalletServiceImpl>((container) => container.resolve(WalletServiceImpl)),
});
container.register('AuthService', {
  useFactory: instancePerContainerCachingFactory<AuthServiceImpl>((container) => container.resolve(AuthServiceImpl)),
});
container.register('KeyClient', {
  useFactory: instancePerContainerCachingFactory<KeyClientImpl>((container) => container.resolve(KeyClientImpl)),
});
container.register('KeyClientUtil', {
  useFactory: instancePerContainerCachingFactory<KeyClientUtilImpl>((container) => container.resolve(KeyClientUtilImpl)),
});
container.register('UIService', {
  useFactory: instancePerContainerCachingFactory<UIServiceImpl>((container) => container.resolve(UIServiceImpl)),
});
container.register('DeviceShareRepository', {
  useFactory: instancePerContainerCachingFactory<DeviceShareRepositoryImpl>((container) => container.resolve(DeviceShareRepositoryImpl)),
});
container.register('ServerShareRepository', {
  useFactory: instancePerContainerCachingFactory<ServerShareRepositoryImpl>((container) => container.resolve(ServerShareRepositoryImpl)),
});
container.register('TorusShareRepository', {
  useFactory: instancePerContainerCachingFactory<TorusShareRepositoryImpl>((container) => container.resolve(TorusShareRepositoryImpl)),
});
container.register('RootKeyRepository', {
  useFactory: instancePerContainerCachingFactory<RootKeyRepositoryImpl>((container) => container.resolve(RootKeyRepositoryImpl)),
});
container.register('RTNSettingsRepository', {
  useFactory: instancePerContainerCachingFactory<RTNSettingsRepositoryImpl>((container) => container.resolve(RTNSettingsRepositoryImpl)),
});
