export interface IUtil extends IUtilState {
  startLoading: () => void;
  endLoading: () => void;
  setIsShowLoading: (isShowLoading: boolean) => void;
}

export interface IUtilState {
  isLoadingCnt: number;
  isShowLoading: boolean;
}
