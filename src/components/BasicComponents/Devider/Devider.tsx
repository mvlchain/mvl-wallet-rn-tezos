import React from 'react';

import { DeviderThick, DeviderThin } from './Devider.style';
import { DEVIDER_THICKNESS, IDeviderProps } from './Devider.type';

function Devider({ thickness }: IDeviderProps) {
  return thickness === DEVIDER_THICKNESS.THICK ? <DeviderThick /> : <DeviderThin />;
}

export default Devider;
