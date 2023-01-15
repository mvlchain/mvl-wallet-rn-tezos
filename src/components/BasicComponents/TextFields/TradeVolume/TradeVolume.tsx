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
import { qrPayLogger } from '@@utils/Log';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { inputNumberFormatter } from '@@utils/gas';

import * as S from '../TextField.style';

import { ITradeVolumeComponentProps } from './TradeVolume.type';

/**
 * @param value type Bignumber 부모로부터 오는 우리가 실제 사용하려는 값, 내부에서는 displayValue라는 state를 만들어서 보이는 값을 핸들링함.
 * @param setValue 부모로부터 오는 위의 value를 핸들링하는 함수.
 * @parma setValueValid 부모로부터 위의 value가 valid한지 판단. balance기준으로 대소 비교.
 * @screen WalletTokenSendScreen
 * @screen TradeScreen
 * @기능 value set
 * @기능 max 누르면 gas를 제외한 가능한 양만큼 셋
 * @기능 balance잔고 보여주기
 * @기능 handletokenselect (해당 prop들어오면 화살표아이콘 표시됨)
 */
export function TradeVolume(props: ITradeVolumeComponentProps) {
  const {
    label,
    tokenDto,
    debounceTime = 1000,
    editable = true,
    useMax,
    hideBalance,
    disableDelete,
    textInputRef,
    value,
    setValue,
    setValueValid,
    handleTokenSelect,
  } = props;

  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [usingMax, setUsingMax] = useState(false);
  const [balanceWarning, setBalanceWarning] = useState<string | null>(null);

  const { t } = useTranslation();
  const { color } = useColor();
  const { total } = gasStore();
  const { balance } = useOneTokenBalance(tokenDto);
  const bnBalance = new BigNumber(balance).shiftedBy(tokenDto.decimals);
  const validStrBalance = total ? formatBigNumber(bnBalance.minus(total), tokenDto.decimals).toString(10) : balance;

  const setValueDebounce = useDebounce((value: BigNumber | null) => {
    setValue(value);
  }, debounceTime);

  const handleValueAndDisplayValue = (value: string) => {
    const formattedValue = inputNumberFormatter(value, tokenDto.decimals);
    setShowDelete(!!value);
    setDisplayValue(formattedValue);
    setValueDebounce(formattedValue ? new BigNumber(formattedValue).shiftedBy(tokenDto.decimals) : null);
  };

  const onChange = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    //사용자가 직접 입력하기 시작하면 usingMax를 해제한다.
    if (usingMax) {
      setUsingMax(false);
    }
    const value = data.nativeEvent.text;
    handleValueAndDisplayValue(value);
  };

  const clearTextField = () => {
    setBalanceWarning(null);
    setUsingMax(false);
    handleValueAndDisplayValue('');
  };

  // SetUp initial value
  useEffect(() => {
    qrPayLogger.log(`Setting TradeVolume value to: ${value?.toString(10)}`);
    if (value) {
      setDisplayValue(value.toString(10));
    }
  }, [value]);

  useEffect(() => {
    setShowDelete(!!value);
  }, [value]);

  //max버튼을 눌렀을 경우, 가능한 양만큼 set해준다.
  //coin은 balance에서 total total gas fee를 제외한 값을 셋팅해준다.
  //total gas fee는 주기적을 fetch해서 변하기때문에 주기적으로 바꾸어줘야한다.
  //token은 balance를 셋팅해준다.
  const onPressMax = () => {
    if (tokenDto.contractAddress) {
      handleValueAndDisplayValue(balance);
    } else {
      setUsingMax(true);
    }
  };

  useEffect(() => {
    if (!usingMax || hideBalance || tokenDto.contractAddress) return;
    handleValueAndDisplayValue(validStrBalance);
  }, [hideBalance, usingMax, total, value, tokenDto]);

  useEffect(() => {
    if (hideBalance) return;
    if (value && value.gt(bnBalance)) {
      setBalanceWarning(t('msg_insufficient_amount'));
    } else {
      setBalanceWarning(null);
    }
  }, [value, hideBalance, bnBalance]);

  useEffect(() => {
    if (!setValueValid) return;
    if (!displayValue || balanceWarning) {
      setValueValid(false);
    } else {
      setValueValid(true);
    }
  }, [balanceWarning, !displayValue]);

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
          {editable ? (
            <S.TradeVolumeInput
              ref={textInputRef}
              value={displayValue ?? ''}
              onChange={onChange}
              keyboardType={'numeric'}
              selectionColor={color.black}
              placeholder={'0.00'}
              placeholderTextColor={color.grey300Grey700}
              editable={editable}
            />
          ) : (
            <S.TradeVolumeInputText numberOfLines={1} lineBreakMode='tail'>
              {value?.toString(10)}
            </S.TradeVolumeInputText>
          )}
          {!disableDelete && showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
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
      {!hideBalance && (balanceWarning ? <S.Hint>{balanceWarning}</S.Hint> : <S.Balance>{`${t('balance')}: ${balance}`}</S.Balance>)}
    </S.TradeVolumeContainer>
  );
}
