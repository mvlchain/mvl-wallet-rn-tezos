import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

function TitleOnlyModal(title: string) {
  const { closeModal, modalType } = globalModalStore();
  return <BaseModal title={title} onConfirm={closeModal} isVisible={modalType === MODAL_TYPES.TITLE_ONLY} modalPosition={'center'} />;
}

export default TitleOnlyModal;
