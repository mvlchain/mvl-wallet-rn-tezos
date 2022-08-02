import { ETHEREUM } from './BlockChain';
import { Clutch, keyDerivationPath, extendedKeyPath } from './Clutch';
import { KeyPair } from './KeyPair';

const PRIVATE_KEY = '9ccef3bb3a34182dfd138e101997bdf1770a3b92aeb525cfed548ace0bd2c38';
const MNEMONIC =
  'antenna guess solve guard cross scrap leg check three art galaxy sail jacket fade tool frost false tree relief mule sock future rail abuse';

it('create a wallet with random key', () => {
  const wallet = Clutch.createWallet();

  expect(wallet.address).not.toBe('');
});

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
    'xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9',
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW',
  );
});

it('create extended KeyPair from mnemonic, BIP32 RootKey', () => {
  const extendedKeyPair = Clutch.extendedKeyPairWithMnemonic(MNEMONIC, 'm');

  expect(extendedKeyPair.xprv).toBe(
    'xprv9s21ZrQH143K2zumkK1om7cGwfRaEwAGffFBC92jYJdvPMkKtG78DaY2iUKzA3LNENuWwaSAuxv8nZLXtS7Vb6x2GUTfaj3EXPtyhHhr8H9',
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub661MyMwAqRbcFUzErLYp8FZ1VhG4ePt82tAmzXSM6eAuGA5URoRNmNrWZkxfAGA5QMBuukJkdCYmdBa8aQXpCQrVMMvYkvWjqfNWcfaKLDW',
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
    'xprv9yxj3pfGaK9o63tNT2MJjGvGRNtTF7wd356VKFgjUCBaEnRtPzPggmmnwi6GfeyGVLb3mixDEvW88vCeXRQwsky8Q1SsbDnoGkSpVBDJzQn',
  );
  expect(extendedKeyPair.xpub).toBe(
    'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA',
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

it('sign a message by extended private key', () => {
  const keyNode = Clutch.keyNode(PRIVATE_KEY, extendedKeyPath(ETHEREUM));
  console.log(`Clutch> xprv: ${keyNode.extendedKey}, xpub: ${keyNode.neuter().extendedKey}`);

  const message = 'This is the test for signing and verifying message';

  const signed = Clutch.signMessageByExtendedKeyPair(keyNode, message, '1659172820501');
  expect(signed).toBe(
    'xpub6Cx5TLCAQgi6JXxqZ3tK6QrzyQiweafUQJ267e6M2XiZ7am2wXhwEa6Go18ScekXdN1DTazvUCu87sJESH6AWHLacQTRUYVcYAUgvUJkCFA' +
      ':1659172820501:H6oM3YyW5k0FB5dQYymrjDPWouJsrAH2UUZBnmWmIUJ3KDv3Q3UXK1hQiJnB6/2GAlIapytoH1UEUF4K9FMxvSc=',
  );

  expect(Clutch.verifyMessageByExtendedKeyPair(message, signed)).toBe(true);
});
