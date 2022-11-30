import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

import { theme } from '@@style/theme';

import useApp from '../useApp';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>{children}</ThemeProvider>;
    </QueryClientProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };

export { AllTheProviders as Providers };
