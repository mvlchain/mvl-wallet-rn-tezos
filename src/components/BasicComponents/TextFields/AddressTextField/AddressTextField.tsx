import React, { useEffect, useState } from 'react';

import { validateAddress } from '@taquito/utils';
import { isAddress } from 'ethers/lib/utils';
import { useTranslation } from 'react-i18next';

import { getNetworkConfig } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { BaseTextField } from '../BaseTextField';

import { IAddressTextFieldProps } from './AddressTextField.type';

function AddressTextField(props: IAddressTextFieldProps) {
  const { placeholder, value, onChange, gotoScan, label } = props;
  const { t } = useTranslation();
  const errorMsg = t('msg_error_invalid_address');
  const [showHint, setShowHint] = useState<boolean>(false);
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);

  //TODO: 검사당연히 해줘야한다고 생각했는데 원래 클러치 앱에서는 안함..
  useEffect(() => {
    handleHint();
  }, [value]);

  const handleHint = useDebounce(() => {
    if (!value) {
      setShowHint(false);
      return;
    }
    switch (network.bip44) {
      case 60:
        if (isAddress(value)) {
          setShowHint(false);
        } else {
          setShowHint(true);
        }
      case 1729:
        if (validateAddress(value)) {
          setShowHint(false);
        } else {
          setShowHint(true);
        }
    }
  }, 800);

  return (
    <BaseTextField
      placeholder={placeholder}
      onChange={onChange}
      gotoScan={gotoScan}
      label={label}
      value={value}
      hint={showHint ? errorMsg : null}
      scanable={true}
    />
  );
}

export default AddressTextField;
