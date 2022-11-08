import { RouteProp } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TTokenDetailRootStackProps = TRootStackNavigationProps<'WALLET_TOKEN_DETAIL'>;
export type TTokenDetailRouteProps = RouteProp<TRootStackParamList, 'WALLET_TOKEN_DETAIL'>;
