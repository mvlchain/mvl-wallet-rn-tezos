import { useEffect, useState } from 'react';

import { toSvg } from 'jdenticon';

import { width } from '@@utils/ui';

import { IUseJdenticonProps } from './Jdenticon.type';

const useJdenticon = ({ value }: IUseJdenticonProps) => {
  const [jdenticon, setJdenticon] = useState<string | null>();

  useEffect(() => {
    const icon = toSvg(value, width * 36);
    setJdenticon(icon);
  }, []);

  return {
    jdenticon,
  };
};

export default useJdenticon;
