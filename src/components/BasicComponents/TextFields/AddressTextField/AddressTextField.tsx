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
          setShowHint(true);
        } else {
          setShowHint(false);
        }
      case 1729:
        if (validateAddress(value)) {
          setShowHint(true);
        } else {
          setShowHint(false);
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
