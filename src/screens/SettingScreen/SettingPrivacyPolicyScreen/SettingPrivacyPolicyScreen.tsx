import React from 'react';

import Webview from '@@components/BasicComponents/Webview';

function SettingPrivacyPolicyScreen() {
  const PRIVACY_URL = 'https://policy.mvlclutch.io/privacy-policy';

  return <Webview url={PRIVACY_URL} />;
}

export default SettingPrivacyPolicyScreen;
