import React from 'react';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { render } from '@@test/test-utils';
import { mockApi } from '@@utils/mockApi';

import { EarnEventListScreen } from './EarnEventListScreen';

/**
 * MOCK UseCases
 *  useEarnEventList
 *  useRefetchByRefreshControl
 *  useNavigation
 *  useTranslation
 */
jest.mock('@@hooks/event/useEarnEventList', () => {
  const useEarnEventList = () => {
    return {
      isLoading: false,
      error: null,
      data: mockApi<EarnEventDto[]>('v1/earn-event/list.json'),
      refetch: jest.fn(),
    };
  };
  return {
    useEarnEventList,
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('@@hooks/useRefetchByRefreshControl', () => {
  const useRefetchByRefreshControl = (refetch: () => Promise<unknown>) => ({
    refreshing: false,
    refresh: jest.fn(),
  });

  return {
    useRefetchByRefreshControl,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

/**
 * MOCK events
 * "id": "65974552-8035-4242-9eb6-1a3ad2321094",
 * "id": "6360d830-8b30-4b8d-8b7b-4994d23f12eb",
 * "id": "a39b36f1-7f6d-45f5-95a6-b37eff1f1d86",
 * "id": "05d72db6-6ef5-4f82-8ff5-e7c7955802d2",
 */
describe('EarnEventListScreen', () => {
  it('list', async () => {
    const { toJSON } = render(<EarnEventListScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
