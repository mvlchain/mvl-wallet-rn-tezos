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
import { GasService } from '@@domain/gas/GasService';
import { GasRepositoryImpl } from '@@domain/gas/repository/gasRepository/GasRepository';
import { GasRepositoryEip1559Impl } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEIP1559';
import { GasRepositoryTezosImpl } from '@@domain/gas/repository/gasRepositoryTezos/GasRepositoryTezos';
import { TokenRepository } from '@@domain/token/repositories/TokenRepository';
import { TradeRepository } from '@@domain/trade/repositories/tradeRepository';
import { TransactionService } from '@@domain/transaction/TransactionService';
import { TransactionServiceEthers } from '@@domain/transaction/service/transactionServiceEthers/TransactionServiceEthers';
import { TransactionServiceTezos } from '@@domain/transaction/service/transactionServiceTezos/TransactionServiceTezos';
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

container.register('TransactionService', {
  useFactory: instancePerContainerCachingFactory<TransactionService>((container) => container.resolve(TransactionService)),
});

container.register('TransactionServiceEthers', {
  useFactory: instancePerContainerCachingFactory<TransactionServiceEthers>((container) => container.resolve(TransactionServiceEthers)),
});

container.register('TransactionServiceTezos', {
  useFactory: instancePerContainerCachingFactory<TransactionServiceTezos>((container) => container.resolve(TransactionServiceTezos)),
});

container.register('GasService', {
  useFactory: instancePerContainerCachingFactory<GasService>((container) => container.resolve(GasService)),
});

container.register('GasRepository', {
  useFactory: instancePerContainerCachingFactory<GasRepositoryImpl>((container) => container.resolve(GasRepositoryImpl)),
});

container.register('GasRepositoryEip1559', {
  useFactory: instancePerContainerCachingFactory<GasRepositoryEip1559Impl>((container) => container.resolve(GasRepositoryEip1559Impl)),
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
