import React, { useEffect, useMemo } from 'react';

import { validateAddress } from '@taquito/utils';
import { useTranslation } from 'react-i18next';

import { getNetworkConfig } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { BaseTextField } from '../BaseTextField';

import { IAddressTextFieldProps } from './AddressTextField.type';

function AddressTextField(props: IAddressTextFieldProps) {
  const { placeholder, value, onChange, gotoScan, label, setParentValid } = props;
  const { t } = useTranslation();

  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  //TODO: 검사당연히 해줘야한다고 생각했는데 원래 클러치 앱에서는 안함..
  const hint = useMemo(() => {
    const errorMsg = t('msg_error_invalid_address');
    if (!value) {
      return null;
    }
    switch (network.bip44) {
      case 60:
        const addressReg = /^0x[a-fA-F0-9]{40}$/g;
        if (addressReg.test(value)) {
          return null;
        } else {
          return errorMsg;
        }
      case 1729:
        if (validateAddress(value)) {
          return null;
        } else {
          return errorMsg;
        }
    }
  }, [value]);

  useEffect(() => {
    handleParentValid();
  }, [hint, value]);

  const handleParentValid = useDebounce(() => {
    if (!hint && value) {
      setParentValid(true);
    } else {
      setParentValid(false);
    }
  }, 100);

  return <BaseTextField placeholder={placeholder} onChange={onChange} gotoScan={gotoScan} label={label} value={value} hint={hint} scanable={true} />;
}

export default AddressTextField;
