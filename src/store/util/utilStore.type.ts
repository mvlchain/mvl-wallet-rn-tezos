export interface IUtil extends IUtilState {
  startLoading: () => void;
  endLoading: () => void;
}

export interface IUtilState {
  isLoadingCnt: number;
}
