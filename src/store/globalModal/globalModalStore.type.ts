import { MODAL_COMPONENTS } from '@@components/Modals/GlobalModal';

export const MODAL_TYPES = {
  TEST_MODAL: 'TEST_MODAL',
} as const;

export type MODAL_TYPE = keyof typeof MODAL_TYPES;
export type MODAL_PROPS<K extends MODAL_TYPE> = Parameters<typeof MODAL_COMPONENTS[K]>[0];

export type OPEN_MODAL_PROPS<K extends MODAL_TYPE> = MODAL_PROPS<K> extends undefined
  ? { modalType: K }
  : { modalType: K; modalProps: MODAL_PROPS<K> };

export interface IGlobalModalStore {
  modalType: MODAL_TYPE | null;
  modalProps: MODAL_PROPS<MODAL_TYPE> | null;
  openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) => void;
  closeModal: () => void;
}
