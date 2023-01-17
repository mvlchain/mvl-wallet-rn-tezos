import React, { PureComponent } from 'react';

import { useTranslation } from 'react-i18next';
import { GestureResponderEvent, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import URL from 'url-parse';

import { mmLightColors } from '@@style/colors';
import { fontStyles } from '@@style/fonts';

import { TextButton as StyledButton } from '../../components/BasicComponents/Buttons/TextButton';

import * as S from './PhishingModal.style';

const createStyles = (colors: any) =>
  StyleSheet.create({
    warningIcon: {
      color: colors.error.default,
      marginRight: 10,
    },
    phishingModalWrapper: {
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    phishingModalContent: {
      height: 495,
      borderRadius: 4,
      backgroundColor: colors.background.default,
    },
    phishingModalTitle: {
      ...fontStyles.bold,
      color: colors.error.default,
      textAlign: 'center',
    },
    phishingModalHeader: {
      backgroundColor: colors.background.default,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    phishingModalInfo: {
      backgroundColor: colors.background.alternative,
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    phishingModalInfoContent: {
      paddingBottom: 20,
    },
    phishingText: {
      ...fontStyles.normal,
      fontSize: 11,
      color: colors.text.default,
      marginBottom: 15,
    },
    link: {
      textDecorationColor: colors.text.default,
      textDecorationLine: 'underline',
    },
    bold: {
      ...fontStyles.bold,
    },
    phishingFooter: {
      marginTop: 10,
      alignItems: 'flex-end',
    },
    backToSafetyContainer: {
      borderWidth: 0,
      padding: 10,
    },
    backToSafetyText: {
      color: colors.error.default,
      fontSize: 12,
    },
    foxImage: {
      alignSelf: 'center',
      width: 48,
      height: 48,
      marginBottom: -15,
      zIndex: 99999,
    },
  });

// const foxImage = require('../../../images/fox.png');

type PropTypes = {
  /**
   * name of the blacklisted url
   */
  fullUrl: string;
  /**
   * called when tapping on "Ethereum Phishing Detector"
   */
  goToETHPhishingDetector: (event: GestureResponderEvent) => void;
  /**
   * Called to the user decides to proceed to the phishing site
   */
  continueToPhishingSite: (event: GestureResponderEvent) => void;
  /**
   * Called when the user decides to go to etherscam db website
   */
  goToEtherscam: (event: GestureResponderEvent) => void;
  /**
   * Called to the user decides to report an issue
   */
  goToFilePhishingIssue: (event: GestureResponderEvent) => void;
  /**
   * Called when the user takes the recommended action
   */
  goBackToSafety: Function;
};

const PhishingModal = (props: PropTypes) => {
  const { t } = useTranslation();

  const colors = mmLightColors;
  const styles = createStyles(colors);
  const urlObj = new URL(props.fullUrl);
  const host = urlObj.hostname;
  const strings = t;

  return (
    <View style={styles.phishingModalWrapper}>
      {/*<Image source={foxImage} style={styles.foxImage} resizeMethod={'auto'} />*/}
      <View style={styles.phishingModalContent}>
        <View style={styles.phishingModalHeader}>
          <S.Label style={styles.phishingModalTitle}>{strings('phishing.ethereum_phishing_detection')}</S.Label>
        </View>
        <ScrollView style={styles.phishingModalInfo} contentContainerStyle={styles.phishingModalInfoContent}>
          <S.Label style={styles.phishingText}>
            <S.Label style={styles.bold}>{host}</S.Label>
            {strings('phishing.intro')}
          </S.Label>
          <S.Label style={styles.phishingText}>
            {strings('phishing.reasons')}
            <S.Label style={styles.link} onPress={props.goToETHPhishingDetector}>
              {strings('phishing.ethereum_phishing_detector')}
            </S.Label>
            . {strings('phishing.list_content')}
          </S.Label>
          <S.Label style={styles.phishingText}>
            {strings('phishing.to_read_more')}
            <S.Label style={styles.link} onPress={props.goToEtherscam}>
              {strings('phishing.review_on_etherscam')}
            </S.Label>
          </S.Label>
          <S.Label style={styles.phishingText}>
            {strings('phishing.warning')}
            <S.Label style={styles.link} onPress={props.continueToPhishingSite}>
              {strings('phishing.continue_on_your_own')}
            </S.Label>
          </S.Label>
          <S.Label style={styles.phishingText}>
            {strings('phishing.reasons')}
            <S.Label style={styles.link} onPress={props.goToFilePhishingIssue}>
              {strings('phishing.file_an_issue')}
            </S.Label>
          </S.Label>
        </ScrollView>
      </View>
      <View style={styles.phishingFooter}>
        <StyledButton onPress={props.goBackToSafety} disabled={false} label={strings('phishing.back_to_safety')} />
      </View>
    </View>
  );
};

export default PhishingModal;
