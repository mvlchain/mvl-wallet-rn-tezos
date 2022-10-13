import { MODAL_COMPONENTS } from '@@components/ModalTest/GlobalModal';

export const MODAL_TYPES = {
  TEST_MODAL: 'TEST_MODAL',
  TOST_MODAL: 'TOST_MODAL',
} as const;

export type MODAL_TYPE = keyof typeof MODAL_TYPES;
export type MODAL_PROPS<K extends MODAL_TYPE> = Parameters<typeof MODAL_COMPONENTS[K]>[0];

export interface GlobalModalStore {
  modalType: MODAL_TYPE | null;
  modalProps: MODAL_PROPS<MODAL_TYPE> | null;
  openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) => void;
  closeModal: () => void;
}
