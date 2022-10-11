import { ChevronDownBlackIcon, TextFieldDelete, TokenMVL32Icon } from '@@assets/image';
import { TextButton } from '@@components/Buttons/TextButton';
import { theme } from '@@style/theme';

import * as S from './styled';
import * as Type from './type';

export function TradeVolume({ useMax, onSelect, label, symbol, value, onChange, hint }: Type.TradeVolumeComponentProps) {
  const clearTextField = () => {};
  return (
    <S.TradeVolumeContainer>
      <S.TradeVolumeTop>
        <S.From>{label}</S.From>
        <TextButton label={'Max'} onPress={() => {}} disabled={true} />
      </S.TradeVolumeTop>
      <S.TradeVolumeMiddle>
        <S.TradeVolumeInputWrapper>
          <S.TradeVolumeInput
            value={value}
            onChange={onChange}
            keyboardType={'numeric'}
            selectionColor={theme.light.color.black}
            placeholder={'0.00'}
            //TODO: 스토어에 theme 들어오면 수정필요
            placeholderTextColor={theme.light.color.grey300Grey700}
          />

          <TextFieldDelete onPress={clearTextField} style={{ marginLeft: 8 }} />
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <TokenMVL32Icon />
          <S.Token>bMVL</S.Token>
          {!!onSelect && <ChevronDownBlackIcon style={{ marginBottom: 4, marginLeft: 8 }} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint && <S.Hint>{hint}</S.Hint>}
    </S.TradeVolumeContainer>
  );
}
