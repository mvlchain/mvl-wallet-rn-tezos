import { importKey } from '@taquito/signer';
import { compose, TezosToolkit } from '@taquito/taquito';
import { tzip12, Tzip12Module } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
// @ts-ignore
import * as tezosCrypto from '@tezos-core-tools/crypto-utils';
import Decimal from 'decimal.js';

import { ETHEREUM } from './BlockChain';
import { Clutch, extendedKeyPath, keyDerivationPath } from './Clutch';
import { KeyPair } from './KeyPair';

const PRIVATE_KEY = '9ccef3bb3a34182dfd138e101997bdf1770a3b92aeb525cfed548ace0bd2c38';
const MNEMONIC =
  'antenna guess solve guard cross scrap leg check three art galaxy sail jacket fade tool frost false tree relief mule sock future rail abuse';

it('create a wallet with string type entropy, no hex prefix, no zero padding', () => {
  const wallet = Clutch.createWalletWithEntropy(PRIVATE_KEY, "m/44'/60'/0'/0/0");

  expect(wallet.address).toBe('0x42D1AD80F2E09B51146b4E7F91C80ee803f5DFe5');
});

it('create a wallet with string type entropy, hex prefix, no zero padding', () => {
  const entropy = `0x${PRIVATE_KEY}`;
  const wallet = Clutch.createWalletWithEntropy(entropy, "m/44'/60'/0'/0/0");

  expect(wallet.address).toBe('0x42D1AD80F2E09B51146b4E7F91C80ee803f5DFe5');
});

it('create a wallet with string type entropy, hex prefix, zero padding', () => {
  const entropy = `0x0${PRIVATE_KEY}`;
  const wallet = Clutch.createWalletWithEntropy(entropy, "m/44'/60'/0'/0/0");

  expect(wallet.address).toBe('0x42D1AD80F2E09B51146b4E7F91C80ee803f5DFe5');
});

it('create a wallet with mnemonic phrase and derivation path', () => {
  // keyDerivationPath(ETHEREUM, 0) == "m/44'/60'/0'/0/0"
  const wallet = Clutch.createWalletWithMnemonic(MNEMONIC, keyDerivationPath(ETHEREUM, 0));

  expect(wallet.address).toBe('0x42D1AD80F2E09B51146b4E7F91C80ee803f5DFe5');
});

it('create extended KeyPair, BIP32 RootKey', () => {
  const entropy = `0x0${PRIVATE_KEY}`;
  const extendedKeyPair = Clutch.extendedKeyPair(entropy, 'm');

  expect(extendedKeyPair.xprv).toBe(
    'xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9'
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW'
  );
});

it('create extended KeyPair from mnemonic, BIP32 RootKey', () => {
  const extendedKeyPair = Clutch.extendedKeyPairWithMnemonic(MNEMONIC, 'm');

  expect(extendedKeyPair.xprv).toBe(
    'xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9'
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW'
  );
});

it('create entended PrivateKey, BIP32 RootKey', () => {
  const entropy = `0x0${PRIVATE_KEY}`;
  const xprv = Clutch.extendedPrivateKey(entropy, 'm');

  expect(xprv).toBe('xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9');
});

it('create entended PrivateKey from mnemonic, BIP32 RootKey', () => {
  const xprv = Clutch.extendedPrivateKeyWithMnemonic(MNEMONIC, 'm');

  expect(xprv).toBe('xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9');
});

it('create entended PublicKey, BIP32 RootKey', () => {
  const entropy = `0x0${PRIVATE_KEY}`;
  const xpub = Clutch.extendedPublicKey(entropy, 'm');

  expect(xpub).toBe('xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW');
});

it('create entended PublicKey with mnemonic, BIP32 RootKey', () => {
  const xpub = Clutch.extendedPublicKeyWithMnemonic(MNEMONIC, 'm');

  expect(xpub).toBe('xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW');
});

it('create extended KeyPair, BIP32 ethereum', () => {
  const entropy = `0x0${PRIVATE_KEY}`;

  // extendedKeyPath(60) == "m/44'/60'/0'"
  const extendedKeyPair = Clutch.extendedKeyPair(entropy, extendedKeyPath(ETHEREUM));

  expect(extendedKeyPair.xprv).toBe(
    'xprv9yxj3pfGaK9o63tNT2MJjGvGRNtTF7wd356VKFgjUCBaEnRtPzPggmmnwi6GfeyGVLb3mixDEvW88vCeXRQwsky8Q1SsbDnoGkSpVBDJzQn'
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA'
  );
});

it('create KeyPair -> m/44 style address', () => {
  const keyPair: KeyPair = Clutch.createKeyPair(MNEMONIC, "m/44'/60'/0'/0/0");
  expect(keyPair.privateKey).toBe('0xd2c78318f467cb7b88e7d5aa40eb93abb47375ce0b13cb3253b6c34a4d24ccbb');
  expect(keyPair.publicKey).toBe('0x0272c2bef09f46c1fc947ca9b7c20351dd1f0d005895c1c7d098ba6b3b1b985899');
});

it('create KeyPair with entropy -> m/44 style address', () => {
  const keyPair: KeyPair = Clutch.createKeyPairWithEntropy(PRIVATE_KEY, "m/44'/60'/0'/0/0");
  expect(keyPair.privateKey).toBe('0xd2c78318f467cb7b88e7d5aa40eb93abb47375ce0b13cb3253b6c34a4d24ccbb');
  expect(keyPair.publicKey).toBe('0x0272c2bef09f46c1fc947ca9b7c20351dd1f0d005895c1c7d098ba6b3b1b985899');
});

it('sign a message by extended private key from key node', async () => {
  const keyNode = Clutch.keyNode(PRIVATE_KEY, extendedKeyPath(ETHEREUM));
  console.log(`Clutch> xprv: ${keyNode.extendedKey}, xpub: ${keyNode.neuter().extendedKey}`);

  const message = 'This is the test for signing and verifying message';

  const signed = await Clutch.signMessageByExtendedKeyNode(keyNode, message, '1659172820501');
  expect(signed).toBe(
    'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA' +
      ':1659172820501:H6oM3YyW5k0FB5dQYymrjDPWouJsrAH2UUZBnmWmIUJ3KDv3Q3UXK1hQiJnB6/2GAlIapytoH1UEUF4K9FMxvSc='
  );

  expect(Clutch.verifyMessageByExtendedKeyPair(message, signed)).toBe(true);
});

it('sign a message by extended private key from key pair', async () => {
  const extendedKeyPair = {
    xprv: 'xprv9yxj3pfGaK9o63tNT2MJjGvGRNtTF7wd356VKFgjUCBaEnRtPzPggmmnwi6GfeyGVLb3mixDEvW88vCeXRQwsky8Q1SsbDnoGkSpVBDJzQn',
    xpub: 'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA',
  };

  const message = 'This is the test for signing and verifying message';
  const signed = await Clutch.signMessageByExtendedKeyPair(extendedKeyPair, message, '1659172820501');
  expect(signed).toBe(
    'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA' +
      ':1659172820501:H6oM3YyW5k0FB5dQYymrjDPWouJsrAH2UUZBnmWmIUJ3KDv3Q3UXK1hQiJnB6/2GAlIapytoH1UEUF4K9FMxvSc='
  );
  expect(Clutch.verifyMessageByExtendedKeyPair(message, signed)).toBe(true);
});

describe('Tezos base methods', () => {
  jest.setTimeout(50000);

  const tzDestAddress = 'tz1S3m5Awdixhy5puaXT3w83QqD77rP3EqGT';

  it('create a wallet with mnemonic phrase and tezos', async () => {
    const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
    const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
    expect(mnemonicToSeed.length).toBe(64);
    const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
    const tzAddress0 = keyPair.pkh;
    expect(tzAddress0).toBe('tz1iACqtM523s3R1da5JSTXN2hBbAFYSWE4o');

    // get Tezos coin balance
    const tzBalance = await Tezos.tz.getBalance(tzAddress0);
    console.log(tzBalance.toFixed());

    // fa2.0 token balance
    const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
    const fa2TokenContract = await Tezos.wallet.at(fa2TokenContractAddress);
    const balance = await fa2TokenContract.views
      .balance_of([
        {
          owner: tzAddress0,
          token_id: 0,
        },
      ])
      .read();
    const fa2BalanceRes = JSON.parse(JSON.stringify(balance));
    // const fa2BalanceRes = [
    //   {
    //     request: { owner: 'tz1SPsMFyXYdn7n3483AULz72kwn36tAP9vX', token_id: '0' },
    //     balance: '4410043',
    //   },
    // ];
    console.log(fa2BalanceRes);

    const fa2BalanceStr = fa2BalanceRes[0].balance;
    console.log(fa2BalanceStr);
    // 4410043 -> 4.410043 (decimal 6)

    // fa1.2
    // const fa1_2TokenContractAddress = 'KT1Wdq6sj3ZkNqQ7CeE6kTNbJXfobMX7Eqpz'; // tzBTC
    const fa1_2TokenContractAddress = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1'; // kUSD
    // const fa1_2TokenContractAddress = 'KT1QzmrMs1xUXZJ8TPAoDEFaKC6w56RfdLWo'; // USDtz

    const fa1_2TokenContract = await Tezos.wallet.at(fa1_2TokenContractAddress, compose(tzip12, tzip16));
    const fa1Balance = await fa1_2TokenContract.views.getBalance(tzAddress0).read();
    console.log(fa1Balance.toFixed());
    // 195123 -> 0.0019512 (decimal 8)
    // 33049843457497740 -> 0.0330498 (decimal 18)
  });

  it('send tezos', async () => {
    return;
    const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
    const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
    expect(mnemonicToSeed.length).toBe(64);
    const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
    await importKey(Tezos, keyPair.sk);

    const txHash = await Tezos.wallet
      .transfer({
        to: tzDestAddress,
        amount: 0.1, // in TEZ unit (not muTez)
      })
      .send()
      .then((op) => op.confirmation(1).then(() => op.opHash));
    console.log(`txHash: ${txHash}`);
  });

  it('send fa2 token', async () => {
    return;
    jest.setTimeout(50000);

    const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
    Tezos.addExtension(new Tzip12Module());
    const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
    expect(mnemonicToSeed.length).toBe(64);
    const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
    const tzAddress0 = keyPair.pkh;
    await importKey(Tezos, keyPair.sk);

    const fa2TokenContractAddress = 'KT19363aZDTjeRyoDkSLZhCk62pS4xfvxo6c'; // QUIPU
    const fa2TokenContract = await Tezos.wallet.at(fa2TokenContractAddress, tzip12);
    console.log('before transfer');
    const metadata = await fa2TokenContract.tzip12().getTokenMetadata(0);
    console.log(`metadata`, metadata);
    const tokenId = metadata.token_id;
    const decimals = metadata.decimals;
    const tokenAmount = '1';
    const pennyAmount = new Decimal(tokenAmount).mul(Decimal.pow(10, decimals)).toFixed();
    const op = await fa2TokenContract.methods
      .transfer([{ from_: tzAddress0, txs: [{ to_: tzDestAddress, token_id: tokenId, amount: pennyAmount }] }])
      .send();
    console.log('op send finished');
    await op.confirmation();
    console.log(op.opHash);
  });

  it('send fa1.2 token', async () => {
    return;
    const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
    Tezos.addExtension(new Tzip12Module());
    const mnemonicToSeed = tezosCrypto.utils.mnemonicToSeed(MNEMONIC, '', true);
    expect(mnemonicToSeed.length).toBe(64);
    const keyPair = tezosCrypto.hd.keyPairFromAccountIndex(mnemonicToSeed, 0);
    const tzAddress0 = keyPair.pkh;
    await importKey(Tezos, keyPair.sk);

    const fa1_2TokenContractAddress = 'KT1GG8Zd5rUp1XV8nMPRBY2tSyVn6NR5F4Q1'; // kUSD
    const fa1_2TokenContract = await Tezos.wallet.at(fa1_2TokenContractAddress, tzip12);
    console.log('before transfer');
    const metadata = await fa1_2TokenContract.tzip12().getTokenMetadata(0);
    console.log(`metadata`, metadata);
    const decimals = metadata.decimals;
    const tokenAmount = '0.01';
    const pennyAmount = new Decimal(tokenAmount).mul(Decimal.pow(10, decimals)).toFixed();
    const op = await fa1_2TokenContract.methods.transfer(tzAddress0, tzDestAddress, pennyAmount).send();
    console.log('op send finished');
    await op.confirmation();
    console.log(op.opHash);
  });
});
