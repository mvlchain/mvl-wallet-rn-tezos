import { TMnemonic } from '@@types/MnemonicType';

export interface IAuth extends IAuthState {
  setPKey: (pKey: string) => void;
  setMnemonic: (mnemonic: string) => void;
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonicList: (typedMnemonic: TMnemonic) => void;
  removeMnemonic: (selectedChipIndex: number) => void;
  setFocusedIndex: (index: number) => void;
}

export interface IAuthState {
  pKey: string | null;
  mnemonic: string | null;
  mnemonicList: TMnemonic[];
  focusedIndex: number;
}
