import { RouteProp } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TTokenSendRootStackProps = TRootStackNavigationProps<'WALLET_TOKEN_SEND'>;
export type TTokenSendRouteProps = RouteProp<TRootStackParamList, 'WALLET_TOKEN_SEND'>;
