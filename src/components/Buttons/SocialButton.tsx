import { SocialAppleDark, SocialAppleLight, SocialGoogle } from '@@assets/image';

import { BaseButtonContainer, IconWrapper, BoldLabel, SocialButton, TextWrapper, BaseButtonLabel, baseButtonStyleObj } from './styled';
import { BaseButtonComponentProps } from './type';

export function GoogleButton({ onPress, disabled, wrapperStyle }: BaseButtonComponentProps) {
  const outlineStyle = baseButtonStyleObj.outline;
  return (
    <BaseButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <SocialButton pressed={pressed} disabled={disabled} {...outlineStyle.bg}>
          <IconWrapper disabled={disabled}>
            <SocialGoogle />
          </IconWrapper>
          <TextWrapper>
            <BaseButtonLabel {...outlineStyle.tx} disabled={disabled}>
              {'Continue with'}
            </BaseButtonLabel>
            <BoldLabel {...outlineStyle.tx} disabled={disabled}>
              {' Google'}
            </BoldLabel>
          </TextWrapper>
        </SocialButton>
      )}
    </BaseButtonContainer>
  );
}

export function AppleButton({ onPress, disabled, wrapperStyle }: BaseButtonComponentProps) {
  const blackStyle = baseButtonStyleObj.black;
  return (
    <BaseButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <SocialButton pressed={pressed} disabled={disabled} {...blackStyle.bg}>
          <IconWrapper disabled={disabled}>
            <SocialAppleLight />
          </IconWrapper>
          <TextWrapper>
            <BaseButtonLabel {...blackStyle.tx} disabled={disabled}>
              {'Continue with'}
            </BaseButtonLabel>
            <BoldLabel {...blackStyle.tx} disabled={disabled}>
              {' Apple'}
            </BoldLabel>
          </TextWrapper>
        </SocialButton>
      )}
    </BaseButtonContainer>
  );
}
