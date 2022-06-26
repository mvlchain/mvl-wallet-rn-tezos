import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((flag?: boolean) => setState((state) => flag ?? !state), []);

  return [state, toggle];
};
