import { SocialAppleDark, SocialAppleLight, SocialGoogle } from '@@assets/image';

import { styles } from './BaseButton';
import { BaseButtonContainer, IconWrapper, BoldLabel, SocialButton, TextWrapper, BaseButtonLabel } from './styled';
import { ComponentProps } from './type';

export function GoogleButton({ onPress, disabled, wrapperStyle }: ComponentProps) {
  const outlineStyle = styles[2];
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

export function AppleButton({ onPress, disabled, wrapperStyle }: ComponentProps) {
  const blackStyle = styles[3];
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
