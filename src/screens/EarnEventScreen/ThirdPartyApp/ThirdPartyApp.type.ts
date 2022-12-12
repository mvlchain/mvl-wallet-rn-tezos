export interface IThirdPartyAppProps {
  avatarUrl: string;
  connectionState: string;
  displayName?: string;
  onConnectPress?: () => void;
  onDisconnectPress?: () => void;
}
