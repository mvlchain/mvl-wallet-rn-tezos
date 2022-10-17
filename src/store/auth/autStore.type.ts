import { TMnemonic } from '@@types/MnemonicType';

export interface IAuth extends IAuthState {
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonic: (mnemonic: TMnemonic) => void;
  removeMnemonic: (selectedChipIndex: number) => void;
  setFocusedIndex: (index: number) => void;
}

export interface IAuthState {
  mnemonicList: TMnemonic[];
  focusedIndex: number;
}
