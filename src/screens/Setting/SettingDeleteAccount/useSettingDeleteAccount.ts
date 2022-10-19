import { useState } from 'react';

import { useToggle } from '@@hooks/common/useToggle';

const useSettingDeleteAccount = () => {
  const onPressDeleteButton = () => {
    // TODO: delete Account 기능 붙이기
    console.log('delete account');
  };
  return { onPressDeleteButton };
};

export default useSettingDeleteAccount;
