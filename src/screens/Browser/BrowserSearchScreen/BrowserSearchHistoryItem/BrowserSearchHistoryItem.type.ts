export interface IBrowserSearchHistoryItemProps {
  title: string;
  link: string;
  isFocused: boolean;
  onPress: () => void;
  onPressDelete: () => void;
}

export interface IUseBrowserSearchHistoryItemParam {
  title: string;
}
