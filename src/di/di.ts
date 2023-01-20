/**
 * Dependency Injection
 * import this file from the App(Entry) componet to register di modules
 */
import { container, instancePerContainerCachingFactory } from 'tsyringe';

import { AuthServiceImpl } from '@@domain/auth/AuthService';
import { LegacyAuthMigrationService } from '@@domain/auth/LegacyAuthMigrationService';
import { KeyClientImpl } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtilImpl } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepositoryImpl } from '@@domain/auth/repositories/DeviceShareRepository';
import { EarnEventRepositoryImpl } from '@@domain/auth/repositories/EarnEventRepository';
import { RTNSettingsRepositoryImpl } from '@@domain/auth/repositories/RTNSettingsRepository';
import { RootKeyRepositoryImpl } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepositoryImpl } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepositoryImpl } from '@@domain/auth/repositories/TorusShareRepository';
import { UIServiceImpl } from '@@domain/auth/services/UIService';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { GasRepositoryEthers } from '@@domain/gas/gasRepositoryEthers/GasRepositoryEthers';
import { GasRepositoryTezosImpl } from '@@domain/gas/gasRepositoryTezos/GasRepositoryTezos';
import { SignMessageService } from '@@domain/message-manager/SignMessageService';
import { TokenRepository } from '@@domain/token/repositories/TokenRepository';
import { TradeRepository } from '@@domain/trade/repositories/tradeRepository';
import { TransactionHistoryRepository } from '@@domain/transaction/transactionHistoryRepository/TransactionHistoryRepository';
import { TransactionServiceEthers } from '@@domain/transaction/transactionServiceEthers/TransactionServiceEthers';
import { TransactionServiceTezos } from '@@domain/transaction/transactionServiceTezos/TransactionServiceTezos';
import { EthersWalletClient } from '@@domain/wallet/clients/EthersWalletClient';
import { TezosClient } from '@@domain/wallet/clients/TezosClient';
import { WalletRepositoryImpl } from '@@domain/wallet/repositories/WalletRepository';
import { EthersRepository } from '@@domain/wallet/repositories/blockchainRepositories/EthersRepository';
import { TezosRepository } from '@@domain/wallet/repositories/blockchainRepositories/TezosRepository';
import { WalletBlockChainService } from '@@domain/wallet/services/WalletBlockChainService';
import { WalletServiceImpl } from '@@domain/wallet/services/WalletService';

container.register('WalletRepository', {
  useFactory: instancePerContainerCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
});

container.register('WalletService', {
  useFactory: instancePerContainerCachingFactory<WalletServiceImpl>((container) => container.resolve(WalletServiceImpl)),
});

container.register('EthersRepository', {
  useFactory: instancePerContainerCachingFactory<EthersRepository>((container) => container.resolve(EthersRepository)),
});

container.register('TezosRepository', {
  useFactory: instancePerContainerCachingFactory<TezosRepository>((container) => container.resolve(TezosRepository)),
});

container.register('WalletBlockChainService', {
  useFactory: instancePerContainerCachingFactory<WalletBlockChainService>((container) => container.resolve(WalletBlockChainService)),
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

container.register('EarnEventRepository', {
  useFactory: instancePerContainerCachingFactory<EarnEventRepositoryImpl>((container) => container.resolve(EarnEventRepositoryImpl)),
});

container.register('TokenRepository', {
  useFactory: instancePerContainerCachingFactory<TokenRepository>((container) => container.resolve(TokenRepository)),
});

container.register('EthersWalletClient', {
  useFactory: instancePerContainerCachingFactory<EthersWalletClient>((container) => container.resolve(EthersWalletClient)),
});

container.register('TezosClient', {
  useFactory: instancePerContainerCachingFactory<TezosClient>((container) => container.resolve(TezosClient)),
});
container.register('TransactionServiceEthers', {
  useFactory: instancePerContainerCachingFactory<TransactionServiceEthers>((container) => container.resolve(TransactionServiceEthers)),
});

container.register('TransactionServiceTezos', {
  useFactory: instancePerContainerCachingFactory<TransactionServiceTezos>((container) => container.resolve(TransactionServiceTezos)),
});

container.register('GasRepositoryEthers', {
  useFactory: instancePerContainerCachingFactory<GasRepositoryEthers>((container) => container.resolve(GasRepositoryEthers)),
});

container.register('GasRepositoryTezos', {
  useFactory: instancePerContainerCachingFactory<GasRepositoryTezosImpl>((container) => container.resolve(GasRepositoryTezosImpl)),
});

container.register('LegacyAuthMigrationService', {
  useFactory: instancePerContainerCachingFactory<LegacyAuthMigrationService>((container) => container.resolve(LegacyAuthMigrationService)),
});

container.register('EvmJsonRpcProviderHolder', {
  useFactory: instancePerContainerCachingFactory<EvmJsonRpcProviderHolder>((container) => container.resolve(EvmJsonRpcProviderHolder)),
});

container.register('TradeRepository', {
  useFactory: instancePerContainerCachingFactory<TradeRepository>((container) => container.resolve(TradeRepository)),
});

container.register('TransactionHistoryRepository', {
  useFactory: instancePerContainerCachingFactory<TransactionHistoryRepository>((container) => container.resolve(TransactionHistoryRepository)),
});

container.register('SignMessageService', {
  useFactory: instancePerContainerCachingFactory<SignMessageService>((container) => container.resolve(SignMessageService)),
});
