/**
 * BlockChain network enums
 * name: MVL defined string value for BlockChain network
 * coinType: SLIP-0044(https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
 */

export type BlockChain = {
  name: string;
  coinType: number;
};

export const BITCOIN: BlockChain = {
  name: 'BITCOIN',
  coinType: 1,
};

export const ETHEREUM: BlockChain = {
  name: 'ETHEREUM',
  coinType: 60,
};

/*
 * NOTE!
 * vBinance CoinType is originally 714. but we use ETHEREUM based address rule for Clutch.
 * As a result, use ETHEREUM coinType to handle BSC wallet on Clutch
 */
export const BINANCE: BlockChain = {
  name: 'BSC',
  coinType: 60,
};

export const TEZOS: BlockChain = {
  name: 'XTZ',
  coinType: 1729,
};
