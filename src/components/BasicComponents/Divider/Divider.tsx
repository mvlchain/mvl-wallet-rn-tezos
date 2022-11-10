import React from 'react';

import { DividerThick, DividerThin } from './Divider.style';
import { DIVIDER_THICKNESS, IDividerProps } from './Divider.type';

function Divider({ thickness }: IDividerProps) {
  return thickness === DIVIDER_THICKNESS.THICK ? <DividerThick /> : <DividerThin />;
}

export default Divider;
