import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMnemonic } from '@@types/MnemonicType';

interface IAuth extends IAuthState {
  initMnemonic: (mnemonicArr: TMnemonic[]) => void;
  setMnemonic: (mnemonic: TMnemonic) => void;
  removeMnemonic: (mnemonicWord: string) => void;
  setFocusedIndex: (index: number) => void;
}

interface IAuthState {
  mnemonicList: TMnemonic[];
  focusedIndex: number;
}

const initState: IAuthState = {
  mnemonicList: [],
  focusedIndex: 0,
};

const authStore = create<IAuth>()(
  devtools((set) => ({
    ...initState,
    initMnemonic: (mnemonicArr: TMnemonic[]) => set(() => ({ mnemonicList: mnemonicArr })),
    setMnemonic: (typedMnemonic: TMnemonic) =>
      set((state) => ({
        mnemonicList: state.mnemonicList.map((mnemonic) => {
          if (mnemonic.index === typedMnemonic.index) {
            mnemonic.word = typedMnemonic.word;
          }
          return mnemonic;
        }),
      })),
    removeMnemonic: (mnemonicWord: string) =>
      set((state) => ({
        mnemonicList: state.mnemonicList.map((mnemonic) => {
          if (mnemonic.word === mnemonicWord) {
            mnemonic.word = '';
          }
          return mnemonic;
        }),
      })),
    setFocusedIndex: (index: number) => set(() => ({ focusedIndex: index })),
  }))
);

export default authStore;
