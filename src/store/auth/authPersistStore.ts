import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { AUTH_STAGE } from '@@constants/authStage.constant';

import * as Type from './authPersistStore.type';

const initState: Type.IAuthPersistState = {
  stage: {},
};

const authPersistStore = create(
  persist<Type.IAuthPersist>(
    zustandFlipper((set) => ({
      ...initState,
      setStage: (postboxKey: string, nowStage: keyof typeof AUTH_STAGE) =>
        set(
          (state) => ({
            stage: {
              ...state.stage,
              [postboxKey]: nowStage,
            },
          }),
          false,
          'setStage'
        ),
      removeStageByPostboxKey: (postboxKey: string) =>
        set(
          (state) => {
            if (!state.stage) {
              return state;
            }
            delete state.stage[postboxKey];
            return state;
          },
          false,
          'removeStageByPostboxKey'
        ),
    })),
    {
      name: 'auth',
      getStorage: () => AsyncStorage,
    }
  )
);

export default authPersistStore;
