import globalModalStore from '@@store/globalModal/globalModalStore';

const useSettingLogOutModal = () => {
  const { modalType, closeModal } = globalModalStore();
  // TODO: 로그아웃 기능 만들기
  const onPressLogOut = () => {
    console.log('LogOut!');
  };
  return {
    modalType,
    closeModal,
    onPressLogOut,
  };
};

export default useSettingLogOutModal;
