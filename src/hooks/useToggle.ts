import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((flag?: unknown) => setState((state) => (typeof flag === 'boolean' ? flag : !state)), []);

  return [state, toggle] as const;
};
