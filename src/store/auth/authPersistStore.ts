import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AUTH_STAGE } from '@@constants/authStage.constant';

import * as Type from './authPersistStore.type';

const initState: Type.IAuthPersistState = {
  stage: {},
};

const authPersistStore = create<Type.IAuthPersist>()(
  devtools(
    persist(
      (set) => ({
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
      }),
      {
        name: 'auth',
        getStorage: () => AsyncStorage,
      }
    ),
    { name: 'authPersistStore', enabled: __DEV__ }
  )
);

export default authPersistStore;
