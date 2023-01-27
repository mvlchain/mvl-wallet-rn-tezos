import { RouteProp } from '@react-navigation/native';

import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import { valueOf } from '@@utils/types';

export type TEarnEventDetailsRouteProps = RouteProp<TRootStackParamList, 'EVENT_DETAILS'>;

/**
 * UiState for EarnEventDetailsScreen from useEventDetailsUiState
 */
export interface IEventThirdParty {
  isThirdPartySupported: boolean;
  connection?: IThirdPartyConnection;
  points: IEventPointAmount[];
  isThirdPartyConnectionRequired: boolean;
  error: Error | unknown;
}

export interface IThirdPartyConnection {
  appId: string;
  token: string | null;
  exists: boolean;
  displayName: string | null;
  connectionDeepLink: string | null;
}

export interface IEventPointAmount {
  amount: string;
  key: string;
  title: string;
  currency: string;
}

export interface IEventDetails {
  event: EarnEventDto | undefined;
  phase: valueOf<typeof EventPhase>;
  deepLink?: ThirdPartyDeepLink;
}

export interface IValidEventDetails {
  event: EarnEventDto;
  phase: valueOf<typeof EventPhase>;
  deepLink?: ThirdPartyDeepLink;
}

export interface IEventDetailsGroup {
  details: IValidEventDetails;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
}

export interface IEventDetailsUiState {
  details: IEventDetails;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
  refresh: (newDeepLink?: ThirdPartyDeepLink) => Promise<void>;
}
