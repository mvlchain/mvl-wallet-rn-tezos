import { RouteProp } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TTokenReceiveRootStackProps = TRootStackNavigationProps<'WALLET_TOKEN_RECEIVE'>;
export type TTTokenReceiveRouteProps = RouteProp<TRootStackParamList, 'WALLET_TOKEN_RECEIVE'>;
