import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import SettingBottomMenu from './SettingBottomMenu';
import { ISettingBottomModalProps } from './SettingBottomModal.type';
function SettingBottomModal({ menuList }: ISettingBottomModalProps) {
  const { modalType, closeModal } = globalModalStore();

  return (
    <BaseModal
      title={'theme'}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.SETTING_BOTTOM}
      onClose={() => {
        closeModal();
      }}
    >
      {menuList.map((props) => (
        <SettingBottomMenu
          {...props}
          onPress={() => {
            props.onPress();
            closeModal();
          }}
        />
      ))}
    </BaseModal>
  );
}

export default SettingBottomModal;
