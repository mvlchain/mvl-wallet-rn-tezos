export interface EarnEventDto {
  id: string;
  alias: string;
  eventStartAt: string;
  eventEndAt: string;
  claimStartAt: string;
  claimEndAt: string;
  iconUrl: string;
  title: string;
  subTitle: string;
  detailPageUrl: string;
  pointIconUrl: string | null;
  pointArr: EarnEventPoint[] | null;
  eventActionButtonTitle: string | null;
  eventActionScheme: string | null;
  currency: string | null;
  currencyIconUrl?: string | null;
  calcInfoPageUrl: string | null;
  claimType: string | null;
  app: ThirdPartyApp | null;
  isAllowParticipationInClaim: boolean;
}

export interface EarnEventPoint {
  key: string;
  title: string;
  currency: string;
}

export interface ThirdPartyApp {
  id: string;
  name: string;
  connectionDeepLink: string | null;
}
