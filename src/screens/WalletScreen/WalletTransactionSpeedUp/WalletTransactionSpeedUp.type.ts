import { RouteProp } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TSpeedUpRootStackProps = TRootStackNavigationProps<'WALLET_TRANSACTION_SPEED_UP'>;
export type TSpeedUpRouteProps = RouteProp<TRootStackParamList, 'WALLET_TRANSACTION_SPEED_UP'>;
