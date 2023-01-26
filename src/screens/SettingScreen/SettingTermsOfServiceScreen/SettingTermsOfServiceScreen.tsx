import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import Webview from '@@components/BasicComponents/Webview';
const TOS_URL = 'https://policy.mvlclutch.io/tos';

function SettingTermsOfService() {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <Webview url={TOS_URL} />
    </ErrorBoundary>
  );
}

export default SettingTermsOfService;
