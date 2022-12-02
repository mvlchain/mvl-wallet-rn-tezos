/**
 * JSON mock response loader
 * location: __mocks__/api/...
 *
 * ex)
 * const response: ReturnType = mockApi<ReturnType>('v1/earn-event/list.json');
 *
 * @param path relative path based in __mocks__/api/ folder
 */

import { EventList } from '@@mocks/api';

export const mockApi = <Type>(path: string): Type | null => {
  let data = null;

  switch (path) {
    case 'v1/earn-event/list.json':
      data = EventList;
      break;
  }
  return data as Type | null;
};
