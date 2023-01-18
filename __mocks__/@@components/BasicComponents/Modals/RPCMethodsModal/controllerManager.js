export const init = jest.fn();
export const controllerMessenger = jest.fn();
export const networkController = jest.fn();
export const transactionController = jest.fn();
export const messageManager = jest.fn();
export const personalMessageManager = jest.fn();
export const typedMessageManager = jest.fn();

export const controllerManager = {
  __esModule: true,
  init,
  controllerMessenger,
  networkController,
  transactionController,
  messageManager,
  personalMessageManager,
  typedMessageManager,
};
export default {
  __esModule: true,
  default: controllerManager,
  controllerManager,
};
