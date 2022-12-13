import React, { useState, useEffect } from 'react';

import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { useColor } from '@@hooks/useTheme';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { height } from '@@utils/ui';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const { useMax, onSelect, label, tokenDto, onChange, hint, disableHint } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const { balance } = useOneTokenBalance(tokenDto);
  const { color } = useColor();
  const debounceCallback = useDebounce((value: BigNumber | null) => {
    onChange(value);
    setShowDelete(!!value);
  }, 1000);

  useEffect(() => {
    debounceCallback(getUnitValue(displayValue));
  }, [displayValue]);

  const getUnitValue = (value: string | null) => {
    if (!value) return null;
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        return parseUnits(value, 6);
      default:
        return parseUnits(value, 'ether');
    }
  };

  const clearTextField = () => {
    onChange(null);
    setDisplayValue(null);
    setShowDelete(false);
  };

  const onKeyPress = () => {
    setShowDelete(true);
  };

  const alphaNumericDecimalRegex = () => {
    // tokenDTO에 있는 decimals를 기준으로 입력 가능하게 자름
    return new RegExp(`^(\\d)*([.]\\d{0,${tokenDto.decimals}})*?$`);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let value = data.nativeEvent.text;
    // .으로 시작할 때 제외
    if (value === '.') return;
    // 숫자, 소수점만 입력 가능, 소수점 token decimals까지만 입력 가능
    const regExp = alphaNumericDecimalRegex();
    if (!regExp.test(value)) return;

    // 0이 여러개로 시작할 때 제외
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
      value = value.slice(1);
    }
    // 소수점 2개 제외
    if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return;
    }
    setDisplayValue(value);
  };

  return (
    <S.TradeVolumeContainer>
      <S.TradeVolumeTop>
        <S.Label>{label}</S.Label>
        {useMax && <TextButton label={'Max'} onPress={() => {}} disabled={true} />}
      </S.TradeVolumeTop>
      <S.TradeVolumeMiddle>
        <S.TradeVolumeInputWrapper>
          <S.TradeVolumeInput
            value={displayValue ?? ''}
            onChange={onSet}
            keyboardType={'numeric'}
            selectionColor={color.black}
            placeholder={'0.00'}
            placeholderTextColor={color.grey300Grey700}
            onKeyPress={onKeyPress}
          />
          {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <SvgUri uri={tokenDto.logoURI} width={height * 32} height={height * 32} />
          <S.Token>{tokenDto.symbol}</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {!disableHint && (hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{`Balance: ${balance}`}</S.Balance>)}
    </S.TradeVolumeContainer>
  );
}
