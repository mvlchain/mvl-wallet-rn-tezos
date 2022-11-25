import React, { PropsWithChildren } from 'react';

import { CheckBoxIcon } from '@@assets/image';
import { width } from '@@utils/ui';

import { Base, BaseProps } from '../Base';

import * as S from './Check.style';

function Check({ checked, style, children, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <Base {...props} style={[S.styles.container, style]} checked={checked}>
      <S.CheckBox checked={checked}>{checked && <CheckBoxIcon width={size * 0.6} height={size * 0.4} />}</S.CheckBox>
      {children}
    </Base>
  );
}

const size = width * 20;

export default Check;
