import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { TMnemonic } from '@@components/BasicComponents/Mnemonic/Mnemonic.type';
import { isNotBlank } from '@@utils/strings';

import { AppScreen, IAuth, IAuthState } from './authStore.type';

const initState: IAuthState = {
  pKey: null,
  isSignedIn: false,
  appScreen: AppScreen.Auth,
  mnemonic: null,
  mnemonicList: [],
  focusedIndex: 0,
  initialUrl: null,
};

const authStore = create<IAuth>(
  zustandFlipper(
    (set) => ({
      ...initState,
      setPKey: (pKey: string) =>
        set(
          (state) => ({
            ...state,
            pKey: pKey,
            isSignedIn: isNotBlank(pKey),
          }),
          false,
          'setPkey'
        ),
      setAppScreen: (appScreen: AppScreen) => set(() => ({ appScreen: appScreen }), false, 'setAppScreen'),
      setPKeyAppScreen: (pKey: string, appScreen: AppScreen) =>
        set(
          (state) => ({
            ...state,
            pKey: pKey,
            isSignedIn: isNotBlank(pKey),
            appScreen: appScreen,
          }),
          false,
          'setPKeyAppScreen'
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
      resetAuthStore: (appScreen: AppScreen) => set(() => ({ ...initState, appScreen: appScreen }), false, 'resetAuthStore'),
      setInitialUrl: (url: string | null) => set(() => ({ initialUrl: url }), false, 'setInitalUrl'),
    }),
    'authStore'
  )
);

export default authStore;
