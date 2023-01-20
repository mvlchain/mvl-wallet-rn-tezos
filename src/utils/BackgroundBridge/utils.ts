import { query } from '@metamask/controller-utils';

import controllerManager from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';

export const polyfillGasPrice = async (method: string, params: any[] = []) => {
  const { networkController } = controllerManager;
  const data = await query(networkController.ethQuery, method, params);

  if (data?.maxFeePerGas && !data.gasPrice) {
    data.gasPrice = data.maxFeePerGas;
  }

  return data;
};

export default {
  polyfillGasPrice,
};
