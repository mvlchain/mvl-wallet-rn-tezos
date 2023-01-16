import React from 'react';

import Main from '../Main';

import * as S from './BrowserDappScreen.style';
import { IBrowserDappScreenProps } from './BrowserDappScreen.type';

// TODO: Main(dapp)마무리 시 BrowserDappScreen로 코드 이사시키기(진과 작업이 꼬일까봐 일단 wrapper로 만들어뒀습니다)
function BrowserDappScreen(props: IBrowserDappScreenProps) {
  return <Main />;
}

export default BrowserDappScreen;
