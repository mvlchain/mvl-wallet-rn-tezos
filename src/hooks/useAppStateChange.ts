import { useState, useEffect, useRef } from 'react';

import { AppState, AppStateStatus } from 'react-native';

/**
 * App visibility observer hook.
 * This will not work in the very first time when the component renders
 *
 * @example
 * useAppStateChange(isAppStateVisible => {
 *   isAppStateVisible == true if app is in foreground, false if app is in background
 *   console.log(isAppStateVisible);
 * });
 *
 * @param onAppStateChanged
 */
export const useAppStateChange = (onAppStateChanged: (isAppStateVisible: boolean) => void, dependencies: unknown[]) => {
  const currentAppState = useRef(AppState.currentState);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChanging);
    return () => {
      subscription.remove();
    };
  }, dependencies);

  const onAppStateChanging = (nextAppState: AppStateStatus) => {
    if (currentAppState.current.match(/inactive|background/) && nextAppState === 'active') {
      // foreground
      onAppStateChanged(true);
    } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      // background
      onAppStateChanged(false);
    }
    currentAppState.current = nextAppState;
    setAppState(nextAppState);
  };
};
