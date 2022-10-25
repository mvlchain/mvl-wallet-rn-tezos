const mockSecureKeychain = {
  init: jest.fn(),
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn().mockResolvedValue({ password: '000000' }),
  resetGenericPassword: jest.fn(),
  getSupportedBiometryType: jest.fn().mockResolvedValue('Fingerprint'),
};

export default mockSecureKeychain;
