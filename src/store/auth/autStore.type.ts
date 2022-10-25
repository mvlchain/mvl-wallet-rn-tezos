import { TMnemonic } from '@@types/MnemonicType';

export interface IAuth extends IAuthState {
  setPKey: (pKey: string) => void;
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonic: (mnemonic: TMnemonic) => void;
  removeMnemonic: (selectedChipIndex: number) => void;
  setFocusedIndex: (index: number) => void;
}

export interface IAuthState {
  pKey: string | null;
  mnemonicList: TMnemonic[];
  focusedIndex: number;
}
