import { arrayify, HDNode, hexlify, hexStripZeros, isValidMnemonic, entropyToMnemonic, mnemonicToEntropy, mnemonicToSeed } from 'ethers/lib/utils';

const PRIVATE_KEY = '9ccef3bb3a34182dfd138e101997bdf1770a3b92aeb525cfed548ace0bd2c38';
const PRIVATE_KEY_BYTES = new Uint8Array([
  9, -52, -17, 59, -77, -93, 65, -126, -33, -47, 56, -31, 1, -103, 123, -33, 23, 112, -93, -71, 42, -21, 82, 92, -2, -43, 72, -84, -32, -67, 44, 56,
]);
const SEED = '0xe7dbb7af1f60975dc2a5750195488e61f7b331e4348ff6004117ceb729141c362ed3e023592ea5a6b4ac37e2ec82bc2d6c2e6d06fa1f297a05c0d3d684d90ef0';
const MNEMONIC =
  'antenna guess solve guard cross scrap leg check three art galaxy sail jacket fade tool frost false tree relief mule sock future rail abuse';

it('convert string type entropy to Uint8Array', () => {
  const bytes = arrayify(PRIVATE_KEY, { allowMissingPrefix: true, hexPad: 'left' });

  expect(bytes).toStrictEqual(PRIVATE_KEY_BYTES);
});

it('convert Uint8Array to string type entropy (without zero padding)', () => {
  const entropy = `0x${PRIVATE_KEY}`;

  // clear leading zero pad
  const hex = hexStripZeros(PRIVATE_KEY_BYTES);

  expect(hex).toBe(entropy);
});

it('convert Uint8Array to string type entropy (with zero padding)', () => {
  const entropy = `0x0${PRIVATE_KEY}`;
  const hex = hexlify(PRIVATE_KEY_BYTES, { allowMissingPrefix: true, hexPad: 'left' });

  expect(hex).toBe(entropy);
});

it('entropy to mnemonic', () => {
  const entropy = `0${PRIVATE_KEY}`;
  const bytes = arrayify(entropy, { allowMissingPrefix: true, hexPad: 'left' });

  expect(entropyToMnemonic(bytes)).toBe(MNEMONIC);
});

it('transform mnemonic to entropy', () => {
  expect(mnemonicToEntropy(MNEMONIC)).toBe(`0x0${PRIVATE_KEY}`);
});

it('transform mnemonic to seed', () => {
  expect(hexStripZeros(mnemonicToSeed(MNEMONIC))).toBe(SEED);
});

it('transform entropy to seed', () => {
  const mnemonic = entropyToMnemonic(arrayify(PRIVATE_KEY, { allowMissingPrefix: true, hexPad: 'left' }));
  expect(mnemonicToSeed(mnemonic)).toBe(SEED);
});

it('is valid mnemonic => false', () => {
  const mnemonic = 'antenna ';
  expect(isValidMnemonic(mnemonic)).toBe(false);
});

it('wallet derivation path -> simple address', () => {
  const mnemonic = entropyToMnemonic(arrayify(PRIVATE_KEY, { allowMissingPrefix: true, hexPad: 'left' }));
  const root = HDNode.fromMnemonic(mnemonic);
  const node = root.derivePath('m/0');

  expect(node.address).toBe('0x94c48A742a7757E23Cd2719589832aa5862d1856');
});

it('wallet derivation path -> m/44 style address', () => {
  const mnemonic = entropyToMnemonic(arrayify(PRIVATE_KEY, { allowMissingPrefix: true, hexPad: 'left' }));
  const root = HDNode.fromMnemonic(mnemonic);
  const node = root.derivePath("m/44'/60'/0'/0/0");

  expect(node.address).toBe('0x42D1AD80F2E09B51146b4E7F91C80ee803f5DFe5');
  expect(node.privateKey).toBe('0xd2c78318f467cb7b88e7d5aa40eb93abb47375ce0b13cb3253b6c34a4d24ccbb');
  expect(node.publicKey).toBe('0x0272c2bef09f46c1fc947ca9b7c20351dd1f0d005895c1c7d098ba6b3b1b985899');
});
