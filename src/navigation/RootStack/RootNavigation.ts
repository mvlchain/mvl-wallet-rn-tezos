import { createNavigationContainerRef, NavigationAction, NavigationState } from '@react-navigation/native';

import { TRootStackParamList } from './RootStack.type';

export const navigationRef = createNavigationContainerRef<TRootStackParamList>();

export function navigate(screen: keyof TRootStackParamList, params?: {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}

export function dispatch(action: NavigationAction | ((state: NavigationState) => NavigationAction)) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
}
