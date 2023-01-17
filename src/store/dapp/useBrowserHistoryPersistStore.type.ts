export interface IUseBrowserHistoryPersist extends IBrowserHistoryPersistState {
  addBrowserHistory: (history: IBrowserHistory) => void;
  deleteBrowserHistory: (link: string) => void;
}

export interface IBrowserHistoryPersistState {
  browserHistory: IBrowserHistory[];
}

export interface IBrowserHistory {
  title: string;
  link: string;
}
