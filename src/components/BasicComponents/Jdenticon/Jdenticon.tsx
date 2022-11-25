import React from 'react';

import { SvgXml } from 'react-native-svg';

import { IJdenticonProps } from './Jdenticon.type';
import useJdenticon from './useJdenticon';

function Jdenticon({ value }: IJdenticonProps) {
  const { jdenticon } = useJdenticon({ value });
  if (!jdenticon) return <></>;
  return <SvgXml xml={jdenticon} />;
}

export default Jdenticon;
