import React, { useState } from 'react';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { ROUTE_NAME } from '@@assets/constants';
import { PrimaryButton } from '@@components/Buttons/BaseButton';
import { TextButton } from '@@components/Buttons/TextButton';
import Mnemonic from '@@components/Mnemonic/Mnemonic';
import { MainTabParamList } from '@@types/MainTabType';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

const mnemonic =
  'legend shop meadow arch border eagle river puppy earth express turn media debris brass kite error daughter food option bag extra blame food year';
type seedPhraseProp = BottomTabNavigationProp<MainTabParamList, 'SEEDPHRASE'>;

function SeedPhrase() {
  const [type, setType] = useState<'show' | 'hide'>('hide');
  const navigation = useNavigation<seedPhraseProp>();
  return (
    <S.Container bounces={false}>
      <S.Description>
        {`Keep this Seed Phrase in a safe and secret place.\n
        DO NOT reveal this phrase to other people!\n
        Clutch team never request you to share this Seed Phrase.`}
      </S.Description>
      <Mnemonic type={type} mnemonic={mnemonic} />
      {type === 'show' && (
        <>
          {/* TODO: image text button 만들기 */}
          <TextButton
            label='Copy to Clipboard'
            onPress={() => console.log('hello')}
            disabled={false}
            wrapperStyle={{ marginTop: height * 30, marginBottom: height * 18 }}
          />
          <PrimaryButton
            label='Next'
            onPress={() => navigation.navigate(ROUTE_NAME.CONFIRM_SEEDPHRASE)}
            disabled={false}
            wrapperStyle={{ marginBottom: height * 30 }}
          />
        </>
      )}
    </S.Container>
  );
}

export default SeedPhrase;
