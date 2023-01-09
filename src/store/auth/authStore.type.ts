import { TMnemonic } from '@@components/BasicComponents/Mnemonic/Mnemonic.type';

export interface IAuth extends IAuthState {
  setPKey: (pKey: string) => void;
  setAppScreen: (appScreen: AppScreen) => void;
  setPKeyAppScreen: (pKey: string, appScreen: AppScreen) => void;
  setMnemonic: (mnemonic: string) => void;
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonicList: (typedMnemonic: TMnemonic) => void;
  removeMnemonic: (selectedChipIndex: number) => void;
  setFocusedIndex: (index: number) => void;
  resetAuthStore: (appScreen: AppScreen) => void;
  setInitialUrl: (initialUrl: string | null) => void;
}

export const AppScreen = {
  Auth: 'Auth',
  Root: 'Root',
} as const;

export type AppScreen = typeof AppScreen[keyof typeof AppScreen];

export interface IAuthState {
  pKey: string | null;
  isSignedIn: boolean;
  appScreen: AppScreen;
  mnemonic: string | null;
  mnemonicList: TMnemonic[];
  focusedIndex: number;
  initialUrl: string | null;
}
