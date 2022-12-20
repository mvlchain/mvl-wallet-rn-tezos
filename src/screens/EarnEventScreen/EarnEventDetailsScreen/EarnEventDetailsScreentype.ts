import { RouteProp } from '@react-navigation/native';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
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
