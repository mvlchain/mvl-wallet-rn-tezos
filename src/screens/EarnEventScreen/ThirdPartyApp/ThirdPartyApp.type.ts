export interface IThirdPartyAppProps {
  avatarUrl: string;
  thirdPartyAccountState: string;
  thirdPartyDisplayName?: string;
  onConnectPress?: () => void;
  onDisconnectPress?: () => void;
}
