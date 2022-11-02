import 'react-native';
import React from 'react';

import App from './App';
import { act, cleanup, render } from './test/test-utils';
import './di/di';
import 'jest-styled-components';

jest.useFakeTimers();

// Note: test renderer must be required after react-native.

afterEach(cleanup);

test('renders correctly', async () => {
  render(<App />);
});
