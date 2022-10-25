import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@@style/theme';

import useApp from '../useApp';

const AllTheProviders = ({ children }) => {
  const { appTheme } = useApp();
  return <ThemeProvider theme={theme[appTheme.label]}>{children}</ThemeProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
