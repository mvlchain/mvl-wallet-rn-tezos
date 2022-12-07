import { RouteProp } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TTransactionResultRootStackProps = TRootStackNavigationProps<'WALLET_TRANSACTION_RESULT'>;
export type TTransactionResultRouteProps = RouteProp<TRootStackParamList, 'WALLET_TRANSACTION_RESULT'>;
