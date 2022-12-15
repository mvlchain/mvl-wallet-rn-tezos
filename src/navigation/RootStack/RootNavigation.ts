import { createNavigationContainerRef } from '@react-navigation/native';

import { TRootStackParamList } from './RootStack.type';

export const navigationRef = createNavigationContainerRef<TRootStackParamList>();

export function navigate(screen: keyof TRootStackParamList, params?: {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}
