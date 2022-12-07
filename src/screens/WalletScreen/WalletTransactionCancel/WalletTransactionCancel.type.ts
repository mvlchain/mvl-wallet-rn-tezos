import { RouteProp } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TCancelRootStackProps = TRootStackNavigationProps<'WALLET_TRANSACTION_CANCEL'>;
export type TCancelRouteProps = RouteProp<TRootStackParamList, 'WALLET_TRANSACTION_CANCEL'>;
