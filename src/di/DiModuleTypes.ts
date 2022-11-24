import { AuthService } from '@@domain/auth/AuthService';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtil } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepository } from '@@domain/auth/repositories/DeviceShareRepository';
import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepository } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepository } from '@@domain/auth/repositories/TorusShareRepository';
import { UIService } from '@@domain/auth/services/UIService';
import { ITokenRepository } from '@@domain/token/repositories/TokenRepository';
import { ContractRepository } from '@@domain/wallet/repositories/WalletBlockChainRepository';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { ContractService } from '@@domain/wallet/services/WalletBlockChainService';
import { WalletService } from '@@domain/wallet/services/WalletService';

/**
 * A map that holds instances registered by di container
 */
export interface DiModuleTypes {
  // Service
  WalletService: WalletService;
  WalletBlockChainService: ContractService;
  AuthService: AuthService;
  UIService: UIService;
  // Repository
  WalletRepository: WalletRepository;
  EthersContractRepository: ContractRepository;
  DeviceShareRepository: DeviceShareRepository;
  ServerShareRepository: ServerShareRepository;
  TorusShareRepository: TorusShareRepository;
  RootKeyRepository: RootKeyRepository;
  RTNSettingsRepository: RTNSettingsRepository;
  EarnEventRepository: EarnEventRepository;
  TokenRepository: ITokenRepository;
  // Client
  KeyClient: KeyClient;
  KeyClientUtil: KeyClientUtil;
}
