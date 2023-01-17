import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import useBrowserHistoryPersistStore from '@@store/dapp/useBrowserHistoryPersistStore';
import useBrowserHistoryStore from '@@store/dapp/useBrowserHistoryStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { format } from '@@utils/strings';

import { IBrowserSearchHistoryItemProps } from './BrowserSearchHistoryItem/BrowserSearchHistoryItem.type';

const useBrowserSearchScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { browserHistory, deleteBrowserHistory } = useBrowserHistoryPersistStore();
  const [history, setHistory] = useState<IBrowserSearchHistoryItemProps[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<IBrowserSearchHistoryItemProps[]>([]);
  const { openModal, closeModal } = globalModalStore();
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const { searchValue, setSearchValue } = useBrowserHistoryStore();

  useEffect(() => {
    const uniqueHistory = new Set(
      browserHistory.map((_history) => ({
        title: _history.title,
        link: _history.link,
        onPress: () => rootNavigation.navigate('BROWSER_DAPP', { link: _history.link }),
        onPressDelete: () => deleteBrowserHistory(_history.link),
        isFocused: isInputFocused,
      }))
    );
    setHistory([...uniqueHistory]);
  }, [browserHistory, isInputFocused]);

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredHistory = history.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      setFilteredHistory(filteredHistory);
    } else {
      setFilteredHistory(history);
    }
  }, [searchValue]);

  const onPressOpenDapp = (link: string) => {
    rootNavigation.navigate('BROWSER_DAPP', { link });
  };

  const onPressCancel = () => {
    rootNavigation.goBack();
  };

  const onPressSearch = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const link = e.nativeEvent.text.indexOf('https://') === -1 ? `https://${e.nativeEvent.text}` : e.nativeEvent.text;
    const findHistory = !!browserHistory.find((history) => history.link === link);
    if (!findHistory) {
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: t('warning'),
        label: format(t('dialog_msg_dapp_warning'), link),
        onCancel: closeModal,
        confirmLabel: t('btn_got_it'),
        onConfirm: () => onPressOpenDapp(link),
      });
    }
  };

  return {
    filteredHistory,
    searchValue,
    setSearchValue,
    setIsInputFocused,
    onPressSearch,
    onPressCancel,
  };
};

export default useBrowserSearchScreen;
