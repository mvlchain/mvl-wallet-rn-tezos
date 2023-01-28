import { useState, useEffect, useRef } from 'react';

import { AppState, AppStateStatus } from 'react-native';

/**
 * App visibility observer hook.
 * This will not work in the very first time when the component renders
 *
 * @param onAppStateChanged
 */
export const useAppStateChange = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const onAppStateChanged = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChanged);
    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};
