import { RESULTS, requestMultiple, Permission, IOSPermission, AndroidPermission, PermissionStatus, openSettings } from 'react-native-permissions';

export type TRequestPermissionResultType = Record<Permission, PermissionStatus>;

export type TPermissionObj = { ios: IOSPermission[]; android: AndroidPermission[] };

export type TWhenPermissionBlockedObj = { title: string; content: string; onPressCancel?: () => void };
