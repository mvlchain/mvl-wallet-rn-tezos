import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { TMnemonic } from '@@components/BasicComponents/Mnemonic/Mnemonic.type';
import { isNotBlank } from '@@utils/strings';

import { IAuth, IAuthState } from './authStore.type';

const initState: IAuthState = {
  pKey: null,
  isSignedIn: false,
  mnemonic: null,
  mnemonicList: [],
  focusedIndex: 0,
};

const authStore = create<IAuth>(
  zustandFlipper(
    (set) => ({
      ...initState,
      setPKey: (pKey: string) =>
        set(
          () => {
            console.log(`setting pkey: ${pKey}`);
            return {
              pKey: pKey,
              isSignedIn: isNotBlank(pKey),
            };
          },
          false,
          'setPkey'
        ),
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
    }),
    'authStore'
  )
);

export default authStore;
