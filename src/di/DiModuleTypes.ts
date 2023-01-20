import { AuthService } from '@@domain/auth/IAuthService';
import { ILegacyAuthMigrationService } from '@@domain/auth/ILegacyAuthMigrationService';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtil } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepository } from '@@domain/auth/repositories/DeviceShareRepository';
import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepository } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepository } from '@@domain/auth/repositories/TorusShareRepository';
import { UIService } from '@@domain/auth/services/UIService';
import { EvmJsonRpcProviderHolder } from '@@domain/blockchain/EvmJsonRpcProviderHolder';
import { GasRepositoryEthers } from '@@domain/gas/gasRepositoryEthers/GasRepositoryEthers';
import { GasRepositoryTezosImpl } from '@@domain/gas/gasRepositoryTezos/GasRepositoryTezos';
import { ITokenRepository } from '@@domain/token/repositories/TokenRepository';
import { TradeRepository } from '@@domain/trade/repositories/tradeRepository';
import { ITransactionHistoryRepository } from '@@domain/transaction/transactionHistoryRepository/TransactionHistoryRepository.type';
import { ITransactionServiceEthers } from '@@domain/transaction/transactionServiceEthers/TransactionServiceEthers.type';
import { ITransactionServiceTezos } from '@@domain/transaction/transactionServiceTezos/TransactionServiceTezos.type';
import { IWalletClient } from '@@domain/wallet/clients/WalletClient.type';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { IBlockChainRepository } from '@@domain/wallet/repositories/blockchainRepositories/WalletBlockChaiRepository.type';
import { IWalletBlockChainService } from '@@domain/wallet/services/WalletBlockChainService';
import { WalletService } from '@@domain/wallet/services/WalletService';

/**
 * A map that holds instances registered by di container
 */
export interface DiModuleTypes {
  // Service
  WalletService: WalletService;
  WalletBlockChainService: IWalletBlockChainService;
  AuthService: AuthService;
  UIService: UIService;

  TransactionHistoryRepository: ITransactionHistoryRepository;
  TransactionServiceEthers: ITransactionServiceEthers;
  TransactionServiceTezos: ITransactionServiceTezos;
  LegacyAuthMigrationService: ILegacyAuthMigrationService;
  EvmJsonRpcProviderHolder: EvmJsonRpcProviderHolder;

  // Repository
  WalletRepository: WalletRepository;
  EthersRepository: IBlockChainRepository;
  TezosRepository: IBlockChainRepository;
  DeviceShareRepository: DeviceShareRepository;
  ServerShareRepository: ServerShareRepository;
  TorusShareRepository: TorusShareRepository;
  RootKeyRepository: RootKeyRepository;
  RTNSettingsRepository: RTNSettingsRepository;
  EarnEventRepository: EarnEventRepository;
  TokenRepository: ITokenRepository;
  GasRepositoryEthers: GasRepositoryEthers;
  GasRepositoryTezos: GasRepositoryTezosImpl;
  TradeRepository: TradeRepository;

  // Client
  KeyClient: KeyClient;
  KeyClientUtil: KeyClientUtil;
  EthersClient: IWalletClient;
  TezosClient: IWalletClient;
}
