export interface IUtil extends IUtilState {
  startLoading: () => void;
  endLoading: () => void;
  turnOffGlobalLoading: () => () => void;
}

export interface IUtilState {
  isLoadingCnt: number;
  isShowLoading: boolean;
}
