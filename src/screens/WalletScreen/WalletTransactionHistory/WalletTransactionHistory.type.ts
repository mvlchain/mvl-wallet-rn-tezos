import { RouteProp } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TTransactionHistoryRootStackProps = TRootStackNavigationProps<'WALLET_TRANSACTION_HISTORY'>;
export type TTransactionHistoryRouteProps = RouteProp<TRootStackParamList, 'WALLET_TRANSACTION_HISTORY'>;
