import React, { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { useColor } from '@@hooks/useTheme';
import { inputNumberFormatter } from '@@utils/gas';
import { height } from '@@utils/ui';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { useMax, onSelect, label, tokenDto, onChange, hint, disableHint, debounceTime = 1000 } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const { balance } = useOneTokenBalance(tokenDto);
  const { color } = useColor();
  const { t } = useTranslation();
  const debounceCallback = useDebounce((value: BigNumber | null) => {
    onChange(value);
    setShowDelete(!!value);
  }, debounceTime);

  useEffect(() => {
    debounceCallback(displayValue ? new BigNumber(displayValue).shiftedBy(tokenDto.decimals) : null);
  }, [displayValue]);

  const clearTextField = () => {
    onChange(null);
    setDisplayValue(null);
    setShowDelete(false);
  };

  const onKeyPress = () => {
    setShowDelete(true);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = data.nativeEvent.text;
    const formattedValue = inputNumberFormatter(value, tokenDto.decimals);
    if (!formattedValue) return;
    setDisplayValue(formattedValue);
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
          {/* TODO: 향후 trade를 위함 */}
          {/* {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />} */}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {!disableHint && (hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{`${t('balance')}: ${balance}`}</S.Balance>)}
    </S.TradeVolumeContainer>
  );
}
