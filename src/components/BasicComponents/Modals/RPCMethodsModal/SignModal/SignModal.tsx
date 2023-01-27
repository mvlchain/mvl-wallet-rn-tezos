import React from 'react';

import { hexToText } from '@metamask/controller-utils';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';

import * as S from './SignModal.style';
import { ISignModalProps } from './SignModal.type';

const SignModal = ({ isVisible, signType, signMessageParams, onConfirm, onCancel }: ISignModalProps) => {
  const { t } = useTranslation();

  const renderPersonalMessage = (messageParams: any) => {
    return (
      <>
        <S.GreyText>{t('sign_message')}:</S.GreyText>
        <S.ContentContainer>
          <S.BlackText>{hexToText(messageParams.data)}</S.BlackText>
        </S.ContentContainer>
      </>
    );
  };

  const renderTypedMessageV3 = (obj: any) => {
    return Object.keys(obj).map((key) => (
      <View key={key}>
        {obj[key] && typeof obj[key] === 'object' ? (
          <>
            <S.GreyText>{key}:</S.GreyText>
            <S.ContentContainer>{renderTypedMessageV3(obj[key])}</S.ContentContainer>
          </>
        ) : (
          <>
            <S.GreyText>{key}:</S.GreyText>
            <S.ContentContainer>
              <S.BlackText>{`${obj[key]}`}</S.BlackText>
            </S.ContentContainer>
          </>
        )}
      </View>
    ));
  };

  const renderTypedMessage = (messageParams: any) => {
    if (messageParams.version === 'V1') {
      return (
        <View>
          {messageParams.data.map((obj: any, i: number) => (
            <View key={`${obj.name}_${i}`}>
              <S.GreyText>{obj.name}:</S.GreyText>
              <S.ContentContainer>
                <S.BlackText>{`${obj.value}`}</S.BlackText>
              </S.ContentContainer>
            </View>
          ))}
        </View>
      );
    }
    if (messageParams.version === 'V3' || messageParams.version === 'V4') {
      const { message } = JSON.parse(messageParams.data);
      return renderTypedMessageV3(message);
    }
  };

  return (
    <ModalLayout
      title={t('signature_request')}
      modalPosition='bottom'
      isVisible={isVisible}
      onConfirm={() => {
        onConfirm();
      }}
      confirmLabel={t('btn_sign')}
      cancelLabel={t('btn_cancel')}
      onClose={onCancel}
      onCancel={onCancel}
      maxHeight={'70%'}
    >
      <S.ScrollContainer bounces={false}>
        {signType === 'typed' && renderTypedMessage(signMessageParams)}
        {signType === 'personal' && renderPersonalMessage(signMessageParams)}
      </S.ScrollContainer>
    </ModalLayout>
  );
};

export default SignModal;
