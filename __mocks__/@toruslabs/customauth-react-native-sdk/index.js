export default {
  init: jest.fn(),
  triggerLogin: jest.fn().mockResolvedValue({ privateKey: '', userInfo: { accessToken: '', idToken: '' } }),
};
