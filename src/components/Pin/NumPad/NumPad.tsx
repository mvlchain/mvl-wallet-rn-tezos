import { Pressable } from 'react-native';

import { BiometricSmallDark, BiometricSmallLight, PasswordDeleteDark, PasswordDeleteLight } from '@@assets/image';
import { NUMPAD } from '@@constants/pin.constant';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

import * as S from './NumPad.style';
import { INumPadProps } from './NumPad.type';

function NumPad({ type, text, backSpace, bioAuth, setPassword }: INumPadProps) {
  const BioIcon = useAssetFromTheme(BiometricSmallLight, BiometricSmallDark);
  const DeleteIcon = useAssetFromTheme(PasswordDeleteLight, PasswordDeleteDark);

  switch (type) {
    case NUMPAD.DELETE:
      return (
        <Pressable onPress={backSpace}>
          {({ pressed }) => (
            <S.NumPadCircle pressed={pressed}>
              <DeleteIcon />
            </S.NumPadCircle>
          )}
        </Pressable>
      );
    case NUMPAD.BIO:
      return (
        <Pressable onPress={bioAuth}>
          {({ pressed }) => (
            <S.NumPadCircle pressed={pressed}>
              <BioIcon />
            </S.NumPadCircle>
          )}
        </Pressable>
      );
    default:
      return (
        <Pressable
          onPress={() => {
            setPassword && setPassword(text!);
          }}
        >
          {({ pressed }) => (
            <S.NumPadCircle pressed={pressed}>
              <S.NumText>{text}</S.NumText>
            </S.NumPadCircle>
          )}
        </Pressable>
      );
  }
}
export default NumPad;
