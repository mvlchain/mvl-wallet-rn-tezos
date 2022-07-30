import ClutchKeyManager from '@@utils/ClutchKeyManager';

const testPrivateKey = '10688c113cda880235602264b9e3e3a0d6460d1821da78ff60073827396b49a1';

const clutchKeyManager: ClutchKeyManager = new ClutchKeyManager(testPrivateKey);

it('constructs correctly', () => {
  expect(clutchKeyManager).toBeDefined();
});

it('export mnemonic correctly', () => {
  expect(clutchKeyManager.extractMnemonic()).toBe(
    'away dutch affair keen possible absurd stereo affair gorilla someone wedding ' +
      'double good alley gauge deputy jump wild achieve icon inform remember charge canvas',
  );
});

it('export ether wallet correctly', () => {
  expect(clutchKeyManager.getAddressForCoin(0)).toBe('0xD110e1CF9FB10b0Ad1522e441D0aD7aaE897efBc');
  expect(clutchKeyManager.getKeyForCoin(0)).toBe('0xea04600bbdb939840e4af564fd7a478198b2bec55f853a55ae6224272774cd37');
});

it('export xprv, xpub correctly', () => {
  expect(clutchKeyManager.accountExtendedKey().xprv).toBe(
    'xprv9yLJZ5mMUvwbbrzVfrhUzmdvDxK8Hrpe8QVjtopx7MX8TBHYWgiQHA3BbMJBSaGZTjuZfiAss9EadsByLXSggQCwPXbkZLxrmdS6moqHwsB',
  );
  expect(clutchKeyManager.accountExtendedKey().xpub).toBe(
    'xpub6CKexbJFKJVtpM4xmtEVMuaemz9chKYVVdRLhCEZfh47Kych4E2epxMfSbqXAXA2pJ3XUTJtnPDAw93yGQtfodJKu8ML7TgSGSXHWeVVZjQ',
  );
});
