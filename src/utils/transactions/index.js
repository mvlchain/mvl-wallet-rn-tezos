import { swapsUtils } from '@metamask/swaps-controller';
import { addHexPrefix } from 'ethereumjs-util';

export const APPROVE_FUNCTION_SIGNATURE = '0x095ea7b3';

export function decodeApproveData(data) {
  return {
    spenderAddress: addHexPrefix(data.substr(34, 40)),
    encodedAmount: data.substr(74, 138),
  };
}

export const isSwapTransaction = (data, origin, to, chainId) =>
  origin === process.env.MM_FOX_CODE &&
  to &&
  (swapsUtils.isValidContractAddress(chainId, to) ||
    (data &&
      data.substr(0, 10) === APPROVE_FUNCTION_SIGNATURE &&
      decodeApproveData(data).spenderAddress?.toLowerCase() === swapsUtils.getSwapsContractAddress(chainId)));
