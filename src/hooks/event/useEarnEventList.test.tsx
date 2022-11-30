import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { container, instancePerContainerCachingFactory, injectable } from 'tsyringe';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { useEarnEventList } from '@@hooks/event/useEarnEventList';
import { renderHook, waitFor } from '@@test/test-utils';
import { mockApi } from '@@utils/mockApi';

const queryClient = new QueryClient();

@injectable()
class MockEarnEventRepository implements EarnEventRepository {
  constructor() {}

  getEvents(): Promise<EarnEventDto[]> {
    const res = mockApi<EarnEventDto[]>('v1/earn-event/list.json');
    return Promise.resolve(res ?? []);
  }
}

beforeAll(() => {
  jest.useFakeTimers();
  container.register('EarnEventRepository', {
    useFactory: instancePerContainerCachingFactory<MockEarnEventRepository>((container) => container.resolve(MockEarnEventRepository)),
  });
});

afterAll(async () => {
  await container.dispose();
});

/**
 * MOCK `mockApi(v1/earn-event/list.json)`
 */
test('useEarnEventList', async () => {
  const { result } = renderHook(() => useEarnEventList(), {
    wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });

  await waitFor(() => expect(result.current.data?.length ?? 0).toBe(4));
});
