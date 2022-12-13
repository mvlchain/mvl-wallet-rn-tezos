import AsyncStorage from '@react-native-async-storage/async-storage';
import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export class DeviceShareHolderDto {
  readonly postboxKeyJsonEncrypted: string;
  readonly shareJsonEncrypted: string;
  readonly polynomialId: string;
  readonly providerTokenJsonEncrypted: string;

  constructor(postboxKeyJsonEncrypted: string, shareJsonEncrypted: string, polynomialId: string, providerTokenJsonEncrypted: string) {
    this.postboxKeyJsonEncrypted = postboxKeyJsonEncrypted;
    this.shareJsonEncrypted = shareJsonEncrypted;
    this.polynomialId = polynomialId;
    this.providerTokenJsonEncrypted = providerTokenJsonEncrypted;
  }
}

type stateType = {
  isAuthenticated: boolean;
  deviceShare?: DeviceShareHolderDto;
  toggle: () => void;
};

const useStore = create(
  zustandFlipper(
    persist<stateType>(
      (set) => ({
        isAuthenticated: false,
        deviceShare: undefined,
        toggle: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),
      }),
      {
        name: 'root',
        getStorage: () => AsyncStorage,
      }
    ),
    'rootStore'
  )
);

export default useStore;
