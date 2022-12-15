export interface IThirdPartyAppProps {
  avatarUrl: string;
  isThirdPartyConnected: boolean;
  connectionState: string;
  displayName?: string;
  onConnectPress?: () => void;
  onDisconnectPress?: () => void;
}
