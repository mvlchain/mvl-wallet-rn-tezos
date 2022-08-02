import { ReactNode } from 'react';

import { Provider } from 'react-native-paper';

import { theme } from './theme';

function PaperProvider({ children }: { children: ReactNode }) {
  return <Provider theme={theme}>{children}</Provider>;
}

export default PaperProvider;
