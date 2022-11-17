import { AuthService } from '@@domain/auth/AuthService';
import { KeyClient } from '@@domain/auth/clients/KeyClient';
import { KeyClientUtil } from '@@domain/auth/clients/KeyClientUtil';
import { DeviceShareRepository } from '@@domain/auth/repositories/DeviceShareRepository';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { RootKeyRepository } from '@@domain/auth/repositories/RootKeyRepository';
import { ServerShareRepository } from '@@domain/auth/repositories/ServerShareRepository';
import { TorusShareRepository } from '@@domain/auth/repositories/TorusShareRepository';
import { UIService } from '@@domain/auth/services/UIService';
import { WalletRepository } from '@@domain/wallet/repositories/WalletRepository';
import { WalletService } from '@@domain/wallet/services/WalletService';

/**
 * A map that holds instances registered by di container
 */
export interface DiModuleTypes {
  // Service
  WalletService: WalletService;

  // Repository
  WalletRepository: WalletRepository;

  AuthService: AuthService;
  KeyClient: KeyClient;
  KeyClientUtil: KeyClientUtil;
  UIService: UIService;
  DeviceShareRepository: DeviceShareRepository;
  ServerShareRepository: ServerShareRepository;
  TorusShareRepository: TorusShareRepository;
  RootKeyRepository: RootKeyRepository;
  RTNSettingsRepository: RTNSettingsRepository;
}
