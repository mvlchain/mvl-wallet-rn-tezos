import React from 'react';

import { HideLight } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { height } from '@@utils/ui';

import * as S from './HideContentSection.style';
import { IHideContentSectionProps } from './HideContentSection.type';

function HideContentSection({ isHide, onPress, description, btnLabel, children }: IHideContentSectionProps) {
  return (
    <S.Container>
      {isHide ? (
        <>
          <S.Description>{description}</S.Description>
          <HideLight />
          <PrimaryButton label={btnLabel} disabled={false} onPress={onPress} wrapperStyle={{ marginTop: height * 56 }} />
        </>
      ) : (
        children
      )}
    </S.Container>
  );
}

export default HideContentSection;
