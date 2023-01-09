import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

export type RouteLink = {
  routeName: keyof TRootStackParamList;
  params?: {};
};
