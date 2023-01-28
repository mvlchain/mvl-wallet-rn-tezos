import createStore from 'zustand/vanilla';

import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';

import { IDeepLinkState, IDeepLinkStore } from './deepLinkStore.type';

const INITIAL_DEEPLINK_STATE: IDeepLinkState = {
  thirdPartyLink: undefined,
};

const deepLinkStore = createStore<IDeepLinkStore>((set) => ({
  ...INITIAL_DEEPLINK_STATE,
  setThirdPartyLink: (thirdPartyLink?: ThirdPartyDeepLink) => {
    set(() => ({ thirdPartyLink: thirdPartyLink }));
  },
}));

export default deepLinkStore;
