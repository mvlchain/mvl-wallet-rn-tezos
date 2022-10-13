import React from 'react';

import { PrimaryButton } from '@@components/Buttons/BaseButton';
import SelectMnemonic from '@@components/Mnemonic/SelectMnemonic';
import TypedMnemonic from '@@components/Mnemonic/TypedMnemonic/TypedMnemonic';
import { height } from '@@utils/ui';

import * as STC from '../Mnemonic.style';

import useConfirmSeedPhrase from './useConfirmSeedPhrase';
const mnemonic =
  'legend shop shop arch border eagle river puppy earth express turn media debris brass kite error daughter food option bag extra blame food year';

function ConfirmSeedPhrase() {
  const { disabled } = useConfirmSeedPhrase();

  return (
    <STC.Container bounces={false}>
      <STC.Description>{`Type each word in the order it was presented to you.`}</STC.Description>
      <TypedMnemonic mnemonic='asdf' />
      <SelectMnemonic mnemonic={mnemonic} />
      <PrimaryButton label='Next' onPress={() => console.log('hello')} disabled={disabled} wrapperStyle={{ marginBottom: height * 30 }} />
    </STC.Container>
  );
}

export default ConfirmSeedPhrase;
