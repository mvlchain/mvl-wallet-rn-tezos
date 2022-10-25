import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { TMnemonic } from '@@types/MnemonicType';

import { IAuth, IAuthState } from './autStore.type';

const initState: IAuthState = {
  pKey: null,
  mnemonicList: [],
  focusedIndex: 0,
};

const authStore = create<IAuth>()(
  devtools((set) => ({
    ...initState,
    setPKey: (pKey: string) => set(() => ({ pKey: pKey }), false, 'setPkey'),
    initMnemonic: (mnemonicArr: TMnemonic[]) => set(() => ({ mnemonicList: mnemonicArr }), false, 'initMnemonic'),
    setMnemonic: (typedMnemonic: TMnemonic) =>
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
        'setMnemonic'
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
  }))
);

export default authStore;
