import 'react-native';
import React from 'react';

import App from './App';
import { act, cleanup, render } from './test/test-utils';

import { container, instancePerContainerCachingFactory, injectable } from 'tsyringe';

import 'jest-styled-components';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { TTheme } from '@@store/setting/settingPersistStore.type';

/**
 * Mock class for RTNSettingsRepository
 */
@injectable()
class MockRTNSettingsRepository implements RTNSettingsRepository {
  constructor() {}

  getThemeType(): TTheme {
    return 'light';
  }
  putThemeType(themeType: TTheme): void {}
}

jest.useFakeTimers();

// Note: test renderer must be required after react-native.
afterEach(cleanup);

beforeEach(() => {
  // mock splash screen
  jest.mock('react-native-splash-screen', () => {
    return {
      hide: jest.fn(),
      show: jest.fn(),
    };
  });
});

container.register('RTNSettingsRepository', {
  useFactory: instancePerContainerCachingFactory<MockRTNSettingsRepository>((container) => container.resolve(MockRTNSettingsRepository)),
});
//const settingsRepository: RTNSettingsRepository = container.resolve('RTNSettingsRepository');

test('renders correctly', async () => {
  render(<App />);
});
