import React, { useState } from 'react';

import { parseUnits } from 'ethers/lib/utils';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputEndEditingEventData } from 'react-native';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import * as TokenIcon from '@@assets/image/token';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { useColor } from '@@hooks/useTheme';
import { useTokenBalance } from '@@hooks/useTokenBalance';
import { height, width } from '@@utils/ui';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { useMax, onSelect, label, symbol, value, onChange, hint, iconUrl } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const TokenImage = TokenIcon[symbol as keyof typeof TokenIcon];
  const { formalizedBalance } = useTokenBalance();
  const { color } = useColor();

  const clearTextField = () => {
    onChange(null);
    setDisplayValue(null);
    setShowDelete(false);
  };

  const onKeyPress = () => {
    setShowDelete(true);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let value = data.nativeEvent.text;

    if (!value) {
      setShowDelete(false);
    }

    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
      value = value.slice(1);
    }

    if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return;
    }

    onChange(parseUnits(value, 'ether'));
    setDisplayValue(value);
  };

  const onEndEditing = (data: NativeSyntheticEvent<TextInputEndEditingEventData>) => {};

  //TODO: 어레이를 계속 필터링해서 가져오는게 맞는걸까? 어차피 토큰 보기전 어레이는 갱신될텐데...토큰하나용 쿼리를 만드는게 좋은걸까?
  //너무 느린것 같아서 고민.
  const selectedToken = formalizedBalance?.find((v) => symbol === v.ticker);

  return (
    <S.TradeVolumeContainer>
      <S.TradeVolumeTop>
        <S.Label>{label}</S.Label>
        <TextButton label={'Max'} onPress={() => {}} disabled={true} />
      </S.TradeVolumeTop>
      <S.TradeVolumeMiddle>
        <S.TradeVolumeInputWrapper>
          <S.TradeVolumeInput
            value={displayValue ?? ''}
            onChange={onSet}
            onEndEditing={onEndEditing}
            keyboardType={'numeric'}
            selectionColor={color.black}
            placeholder={'0.00'}
            placeholderTextColor={color.grey300Grey700}
            onKeyPress={onKeyPress}
          />

          {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <TokenImage width={`${width * 32}`} height={`${width * 32}`} />
          <S.Token>{symbol}</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{`Balance: ${selectedToken?.balance ?? '-'}`}</S.Balance>}
    </S.TradeVolumeContainer>
  );
}
