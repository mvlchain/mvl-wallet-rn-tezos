// code from metamask abi
// https://github.com/MetaMask/metamask-eth-abis/blob/main/src/abis/abiERC20.test.ts
import { abiERC20JSON } from './abiERC20';

describe('abiERC20', () => {
  it('should contain function balanceOf', () => {
    expect(abiERC20JSON).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'balanceOf',
          type: 'function',
        }),
      ])
    );
  });

  it('should contain function decimals', () => {
    expect(abiERC20JSON).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'decimals',
          type: 'function',
        }),
      ])
    );
  });

  it('should contain function totalSupply', () => {
    expect(abiERC20JSON).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'totalSupply',
          type: 'function',
        }),
      ])
    );
  });
});
