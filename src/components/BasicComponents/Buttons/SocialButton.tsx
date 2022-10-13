import { SocialAppleDark, SocialAppleLight, SocialGoogle } from '@@assets/image';

import * as S from './Button.style';
import * as Type from './Button.type';

export function GoogleButton({ onPress, disabled, wrapperStyle }: Type.BaseButtonComponentProps) {
  const outlineStyle = S.baseButtonStyleObj.outline;
  return (
    <S.BaseButtonContainer
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
      style={wrapperStyle}
    >
      {({ pressed }) => (
        <S.SocialButton pressed={pressed} disabled={disabled} {...outlineStyle.bg}>
          <S.IconWrapper disabled={disabled}>
            <SocialGoogle />
          </S.IconWrapper>
          <S.TextWrapper>
            <S.BaseButtonLabel {...outlineStyle.tx} disabled={disabled}>
              a{'Continue with'}
            </S.BaseButtonLabel>
            <S.BoldLabel {...outlineStyle.tx} disabled={disabled}>
              {' Google'}
            </S.BoldLabel>
          </S.TextWrapper>
        </S.SocialButton>
      )}
    </S.BaseButtonContainer>
  );
}

export function AppleButton({ onPress, disabled, wrapperStyle }: Type.BaseButtonComponentProps) {
  const blackStyle = S.baseButtonStyleObj.black;
  return (
    <S.BaseButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <S.SocialButton pressed={pressed} disabled={disabled} {...blackStyle.bg}>
          <S.IconWrapper disabled={disabled}>
            {/* TODO: store에 theme저장되면 수정 필요 */}
            <SocialAppleLight />
          </S.IconWrapper>
          <S.TextWrapper>
            <S.BaseButtonLabel {...blackStyle.tx} disabled={disabled}>
              {'Continue with'}
            </S.BaseButtonLabel>
            <S.BoldLabel {...blackStyle.tx} disabled={disabled}>
              {' Apple'}
            </S.BoldLabel>
          </S.TextWrapper>
        </S.SocialButton>
      )}
    </S.BaseButtonContainer>
  );
}
