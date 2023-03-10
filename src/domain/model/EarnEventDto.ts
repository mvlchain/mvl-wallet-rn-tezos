export interface EarnEventDto {
  claimType: string;
  id: string;
  alias: string;

  eventStartAt: string;
  eventEndAt: string;
  claimStartAt: string;
  claimEndAt: string;

  iconUrl: string;
  title: string;
  subTitle: string;
  /**
   * EarnEventDetailsScreen's main WebView contents
   */
  detailPageUrl: string;

  /**
   * An icon url displaying reward points in EventActionControl
   */
  pointIconUrl: string;
  pointInfoArr: EarnEventPoint[];

  eventActionButtonTitle: string | null;
  /**
   * DeepLink that will execute when the EventActionButton clicked
   */
  eventActionScheme: string | null;
  eventActionAuthRequired: boolean;

  currency: string | null;
  currencyIconUrl?: string | null;

  /**
   * Web page url to show point and token information for clai\m.
   * This page need pubKey in query parameter.
   * ex) https://calcInfoPageUrl.com?pubKey=clutch.pubKey.
   */
  calcInfoPageUrl?: string;

  /**
   * Third party app information.
   */
  app: ThirdPartyApp | null;

  /**
   * A flag that determines whether to allow or not earn point within a claim period
   */
  isAllowParticipationInClaim: boolean;
  /**
   * @description BlockChain Network supported by this earn event.
   * */
  network: string;
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
