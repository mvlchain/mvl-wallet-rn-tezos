import React from 'react';

import Webview from '@@components/BasicComponents/Webview';
const TOS_URL = 'https://policy.mvlclutch.io/tos';

function SettingTermsOfService() {
  return <Webview url={TOS_URL} />;
}

export default SettingTermsOfService;
