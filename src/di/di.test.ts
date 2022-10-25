import { container, instanceCachingFactory } from 'tsyringe';

import { WalletRepository, WalletRepositoryImpl } from '@@domain/wallet/WalletRepository';

beforeAll(() => {
  container.register('WalletRepository', {
    useFactory: instanceCachingFactory<WalletRepositoryImpl>((container) => container.resolve(WalletRepositoryImpl)),
  });
});

afterAll(() => {
  container.dispose();
});

it('is the same singleton instnace', () => {
  const walletService1 = container.resolve<WalletRepository>('WalletRepository');
  const walletService2 = container.resolve<WalletRepository>('WalletRepository');
  expect(walletService1).toBe(walletService2);
});
