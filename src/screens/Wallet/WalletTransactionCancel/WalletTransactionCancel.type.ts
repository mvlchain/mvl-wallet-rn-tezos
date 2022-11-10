import { RouteProp } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TCancelRootStackProps = TRootStackNavigationProps<typeof ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL>;
export type TCancelRouteProps = RouteProp<TRootStackParamList, typeof ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL>;
