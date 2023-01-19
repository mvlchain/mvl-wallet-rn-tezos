export default {
  HOMEPAGE_URL: process.env.MM_HOMEPAGE || 'https://stage.mvlbridge.io/',
  NOTIFICATION_NAMES: {
    accountsChanged: 'metamask_accountsChanged',
    unlockStateChanged: 'metamask_unlockStateChanged',
    chainChanged: 'metamask_chainChanged',
  },
  REQUEST_SOURCES: {
    IN_APP_BROWSER: 'In-App-Browser',
  },
  ETH_SIGN_ERROR: 'eth_sign requires 32 byte message hash',
};
