export interface IUseBrowserHistory extends IUseBrowserHistoryState {
  setSearchValue: (text: string) => void;
}

export interface IUseBrowserHistoryState {
  searchValue: string;
}
