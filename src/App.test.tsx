import 'react-native';
import React from 'react';

import { container, instancePerContainerCachingFactory, injectable } from 'tsyringe';

import App from './App';
import { cleanup, render } from './test/test-utils';

import 'jest-styled-components';
import { RTNSettingsRepository } from '@@domain/auth/repositories/RTNSettingsRepository';
import { TTheme } from '@@store/setting/settingPersistStore.type';

import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';

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

type PartialDynamicLink = {
  getInitialLink(): Promise<FirebaseDynamicLinksTypes.DynamicLink | null>;
};
jest.mock('@react-native-firebase/dynamic-links');
const mockDynamicLinks = dynamicLinks as unknown as jest.MockedFunction<() => PartialDynamicLink>;

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
});

container.register('RTNSettingsRepository', {
  useFactory: instancePerContainerCachingFactory<MockRTNSettingsRepository>((container) => container.resolve(MockRTNSettingsRepository)),
});
//const settingsRepository: RTNSettingsRepository = container.resolve('RTNSettingsRepository');

test('renders correctly', () => {
  mockDynamicLinks.mockReturnValueOnce({
    getInitialLink: jest.fn(),
  });
  render(<App />);
});
