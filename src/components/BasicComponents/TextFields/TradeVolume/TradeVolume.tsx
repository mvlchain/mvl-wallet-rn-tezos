import React, { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import SymbolImage from '@@components/BasicComponents/SymbolImage';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { useColor } from '@@hooks/useTheme';
import gasStore from '@@store/gas/gasStore';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { inputNumberFormatter } from '@@utils/gas';

import * as S from '../TextField.style';

import { ITradeVolumeComponentProps } from './TradeVolume.type';

export function TradeVolume(props: ITradeVolumeComponentProps) {
  const { useMax, value, onSelect, label, tokenDto, onChange, disableHint, debounceTime = 1000, setParentValid, handleTokenSelect } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | null>(null);

  const { balance } = useOneTokenBalance(tokenDto);
  const { color } = useColor();
  const { t } = useTranslation();

  const { total } = gasStore();
  const [usingMax, setUsingMax] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const bnBalance = new BigNumber(balance).shiftedBy(tokenDto.decimals);
  const validStrBalance = total ? formatBigNumber(bnBalance.minus(total), tokenDto.decimals).toString(10) : balance;

  const debounceCallback = useDebounce((value: BigNumber | null) => {
    onChange(value);
    setShowDelete(!!value);
  }, debounceTime);

  const clearTextField = () => {
    onChange(null);
    setDisplayValue(null);
    setHint(null);
    debounceCallback(null);
  };

  const onKeyPress = () => {
    setShowDelete(true);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (usingMax) {
      setUsingMax(false);
    }
    const value = data.nativeEvent.text;
    const formattedValue = inputNumberFormatter(value, tokenDto.decimals);
    setDisplayValue(formattedValue);
    debounceCallback(formattedValue ? new BigNumber(formattedValue).shiftedBy(tokenDto.decimals) : null);
  };

  const onPressMax = () => {
    if (tokenDto.contractAddress) {
      setDisplayValue(balance);
    } else {
      setUsingMax(true);
      setDisplayValue(validStrBalance);
    }
  };

  //max사용할 경우
  useEffect(() => {
    if (!usingMax || disableHint || !total || tokenDto.contractAddress) return;
    setDisplayValue(validStrBalance);
  }, [disableHint, usingMax, total, value, tokenDto]);

  useEffect(() => {
    if (!value || disableHint) return;
    if (value.gt(bnBalance)) {
      setHint(t('msg_insufficient_amount'));
    }
  }, [value, disableHint, bnBalance]);

  useEffect(() => {
    if (!setParentValid) return;
    if (!displayValue || hint) {
      setParentValid(false);
    } else {
      setParentValid(true);
    }
  }, [hint, !displayValue]);

  return (
    <S.TradeVolumeContainer>
      {(label || useMax) && (
        <S.TradeVolumeTop>
          {label && <S.Label>{label}</S.Label>}
          {useMax && <TextButton label={'Max'} onPress={onPressMax} disabled={false} />}
        </S.TradeVolumeTop>
      )}
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
        <S.SymbolWrapper
          onPress={() => {
            if (!handleTokenSelect) return;
            handleTokenSelect();
          }}
        >
          {tokenDto?.logoURI && <SymbolImage symbolURI={tokenDto.logoURI} size={32} />}
          <S.Token>{tokenDto.symbol}</S.Token>
          {handleTokenSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {!disableHint && (hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{`${t('balance')}: ${balance}`}</S.Balance>)}
    </S.TradeVolumeContainer>
  );
}
