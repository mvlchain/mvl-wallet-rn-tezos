import { RouteProp } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type TScanQRRootStackProps = TRootStackNavigationProps<'WALLET_SCAN_QR'>;
export type TScanQRRouteProps = RouteProp<TRootStackParamList, 'WALLET_SCAN_QR'>;
