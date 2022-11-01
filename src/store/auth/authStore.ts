import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMnemonic } from '@@types/MnemonicType';

import { IAuth, IAuthState } from './authStore.type';

const initState: IAuthState = {
  pKey: null,
  mnemonic: null,
  mnemonicList: [],
  focusedIndex: 0,
};

const authStore = create<IAuth>()(
  devtools((set) => ({
    ...initState,
    setPKey: (pKey: string) => set(() => ({ pKey: pKey }), false, 'setPkey'),
    setMnemonic: (mnemonic: string) => set(() => ({ mnemonic: mnemonic }), false, 'setMnemonic'),
    initMnemonic: (mnemonicArr: TMnemonic[]) => set(() => ({ mnemonicList: mnemonicArr }), false, 'initMnemonic'),
    setMnemonicList: (typedMnemonic: TMnemonic) =>
      set(
        (state) => ({
          mnemonicList: state.mnemonicList.map((mnemonic) => {
            if (mnemonic.index === typedMnemonic.index) {
              mnemonic.word = typedMnemonic.word;
              mnemonic.selectChipIndex = typedMnemonic.selectChipIndex;
            }
            return mnemonic;
          }),
          focusedIndex: state.mnemonicList.filter((mnemonic) => mnemonic.word === '')[0]?.index ?? -1,
        }),
        false,
        'setMnemonicList'
      ),
    removeMnemonic: (selectedChipIndex: number) =>
      set(
        (state) => ({
          mnemonicList: state.mnemonicList.map((mnemonic) => {
            if (mnemonic.selectChipIndex === selectedChipIndex) {
              mnemonic.word = '';
              mnemonic.selectChipIndex = -1;
            }
            return mnemonic;
          }),
        }),
        false,
        'removeMnemonic'
      ),
    setFocusedIndex: (index: number) => set(() => ({ focusedIndex: index }), false, 'setFocusedIndex'),
    resetAuthStore: () => set(() => ({ ...initState }), false, 'resetAuthStore'),
  }))
);

export default authStore;
