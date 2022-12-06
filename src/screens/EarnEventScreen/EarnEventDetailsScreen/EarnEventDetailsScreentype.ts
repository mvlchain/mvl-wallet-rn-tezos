import { RouteProp } from '@react-navigation/native';

import { TEventStackParamList, EVENT_STACK_ROUTE } from '@@navigation/EventStack/EventStack.type';

export type TEarnEventDetailsRouteProps = RouteProp<TEventStackParamList, typeof EVENT_STACK_ROUTE.DETAILS>;
