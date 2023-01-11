import 'react-native';
import React from 'react';

import { container, instancePerContainerCachingFactory, injectable } from 'tsyringe';

import App from './App';
import { cleanup, render } from './test/test-utils';

import 'jest-styled-components';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { TTheme } from '@@store/setting/settingPersistStore.type';

import dynamicLinks from '@react-native-firebase/dynamic-links';

/**
 * Mock class for RTNSettingsRepository
 */
@injectable()
class MockRTNSettingsRepository implements RTNSettingsRepository {
  constructor() {}

  getThemeType(): Promise<TTheme> {
    return Promise.resolve('light');
  }
  putThemeType(themeType: TTheme): void {}
}

jest.useFakeTimers();

// Note: test renderer must be required after react-native.
afterEach(() => {
  cleanup();
  container.clearInstances();
});

beforeEach(() => {
  // mock splash screen
  jest.mock('react-native-splash-screen', () => {
    return {
      hide: jest.fn(),
      show: jest.fn(),
    };
  });

  jest.mock('@react-native-firebase/dynamic-links', () => {
    return function () {
      return {
        getInitialLink: async () => ({
          url: 'fake-link',
        }),
      };
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
