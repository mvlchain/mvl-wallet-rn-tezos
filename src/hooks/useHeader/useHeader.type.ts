export interface IUseHeaderProps extends IBackButtonProps {
  title: string;
}

export interface IBackButtonProps {
  onPressBack?: () => void;
  isDisableBack?: boolean;
}
