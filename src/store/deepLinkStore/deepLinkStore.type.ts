import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';

export interface IDeepLinkState {
  thirdPartyLink?: ThirdPartyDeepLink;
}

export interface IDeepLinkStore extends IDeepLinkState {
  setThirdPartyLink: (thirdPartyLink?: ThirdPartyDeepLink) => void;
}
