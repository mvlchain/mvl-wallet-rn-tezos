const keychainMock = {
  SECURITY_LEVEL_ANY: 'MOCK_SECURITY_LEVEL_ANY',
  SECURITY_LEVEL_SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  SECURITY_LEVEL_SECURE_HARDWARE: 'MOCK_SECURITY_LEVEL_SECURE_HARDWARE',
  setGenericPassword: jest.fn().mockResolvedValue({ service: '', storage: '' }),
  getGenericPassword: jest.fn().mockResolvedValue({ username: 'tester', password: '000000' }),
  resetGenericPassword: jest.fn(),
  getSupportedBiometryType: jest.fn().mockResolvedValue('Fingerprint'),
};

export default keychainMock;
