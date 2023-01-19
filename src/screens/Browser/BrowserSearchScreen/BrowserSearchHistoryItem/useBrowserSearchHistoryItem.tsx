import React, { useMemo } from 'react';

import useBrowserHistoryStore from '@@store/dapp/useBrowserHistoryStore';

import * as S from './BrowserSearchHistoryItem.style';
import { IUseBrowserSearchHistoryItemParam } from './BrowserSearchHistoryItem.type';

const useBrowserSearchHistoryItem = ({ title }: IUseBrowserSearchHistoryItemParam) => {
  const { searchValue } = useBrowserHistoryStore();

  const renderTitle = useMemo(
    () => () => {
      if (searchValue.length > 0) {
        const index = title.toLowerCase().indexOf(searchValue.toLowerCase());
        if (index > -1) {
          const before = title.substring(0, index);
          const search = title.substring(index, index + searchValue.length);
          const after = title.substring(index + searchValue.length);
          return (
            <S.Title>
              {before}
              <S.Title isHighlight={true}>{search}</S.Title>
              {after}
            </S.Title>
          );
        }
      }
      return <S.Title>{title}</S.Title>;
    },
    [title, searchValue]
  );

  return { renderTitle };
};

export default useBrowserSearchHistoryItem;
