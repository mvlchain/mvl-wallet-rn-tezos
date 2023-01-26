import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';

import ErrorScreenInRootStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInRootStack';
import Webview from '@@components/BasicComponents/Webview';

function SettingPrivacyPolicyScreen() {
  const PRIVACY_URL = 'https://policy.mvlclutch.io/privacy-policy';

  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInRootStack}>
      <Webview url={PRIVACY_URL} />;
    </ErrorBoundary>
  );
}

export default SettingPrivacyPolicyScreen;
