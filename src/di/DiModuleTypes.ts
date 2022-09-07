import { WalletRepository } from '@@domain/wallet/WalletRepository';
import { WalletService } from '@@domain/wallet/WalletService';

/**
 * A map that holds instances registered by di container
 */
export interface DiModuleTypes {
  // Service
  WalletService: WalletService;

  // Repository
  WalletRepository: WalletRepository;
}
