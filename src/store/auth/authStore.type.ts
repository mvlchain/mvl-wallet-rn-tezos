import { TMnemonic } from '@@components/BasicComponents/Mnemonic/Mnemonic.type';

export interface IAuth extends IAuthState {
  setPKey: (pKey: string) => void;
  setMnemonic: (mnemonic: string) => void;
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonicList: (typedMnemonic: TMnemonic) => void;
  removeMnemonic: (selectedChipIndex: number) => void;
  setFocusedIndex: (index: number) => void;
  resetAuthStore: () => void;
}

export interface IAuthState {
  pKey: string | null;
  isSignedIn: boolean;
  mnemonic: string | null;
  mnemonicList: TMnemonic[];
  focusedIndex: number;
}
