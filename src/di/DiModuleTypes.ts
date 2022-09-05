import { WalletRepository } from '@@domain/wallet/WalletRepository';

/**
 * A map that holds instances registered by di container
 */
export interface DiModuleTypes {
  // Service
  //TradeService: TradeService;

  // Repository
  WalletRepository: WalletRepository;
}
