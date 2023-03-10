/* eslint-disable max-len */
import { parse } from 'url';

import QrCodeParser from './QrCodeParser';

test('QrCodeParser address stating with 0x', () => {
  expect(QrCodeParser.parseAddressByType('0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561')).toBe('0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561');
});

test('QrCodeParser address stating with ethereum:', () => {
  expect(QrCodeParser.parseAddressByType('ethereum:0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561')).toBe(
    '0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561'
  );
});

test('QrCodeParser address stating with ethereum: and chainId', () => {
  expect(QrCodeParser.parseAddressByType('ethereum:0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561@1')).toBe(
    '0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561'
  );
});

test('QrCodeParser address stating with hex address', () => {
  expect(QrCodeParser.parseAddressByType('ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561')).toBe('0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561');
});

test('QrCodeParser parsing path from url', () => {
  const url = parse(
    'https://l.mvlclutch.io/link-transfer/ETHEREUM?tokenAddress=0x3e39300683cf271e067e22431f4c66bb0778a3eb&address=0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637&value=100000000000000000'
  );
  expect(url.path).toBe(
    '/link-transfer/ETHEREUM?tokenAddress=0x3e39300683cf271e067e22431f4c66bb0778a3eb&address=0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637&value=100000000000000000'
  );
});

test('QrCodeParser parsing pathname from url', () => {
  const url = parse(
    'https://l.mvlclutch.io/link-transfer/ETHEREUM?tokenAddress=0x3e39300683cf271e067e22431f4c66bb0778a3eb&address=0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637&value=100000000000000000'
  );
  expect(url.pathname).toBe('/link-transfer/ETHEREUM');
});

test('QrCodeParser parsing network from pathname', () => {
  const url = parse(
    'https://l.mvlclutch.io/link-transfer/ETHEREUM?tokenAddress=0x3e39300683cf271e067e22431f4c66bb0778a3eb&address=0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637&value=100000000000000000'
  );
  const paths = url.pathname?.split('/');
  expect(paths?.length).toBe(3);
  expect(paths?.[2]).toBe('ETHEREUM');
});

test('QrCodeParser valid ethereum address', () => {
  expect(QrCodeParser.isWalletAddress('0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637')).toBe(true);
});

test('QrCodeParser valid ethereum address(without hex prefix)', () => {
  expect(QrCodeParser.isWalletAddress('6CeE88A4298C937ac992Bf7c1806680f6c0d7637')).toBe(true);
});

test('QrCodeParser valid tezos address', () => {
  expect(QrCodeParser.isWalletAddress('tz1L9r8mWmRPndRhuvMCWESLGSVeFzQ9NAWx')).toBe(true);
});

test('QrCodeParser valid tezos address', () => {
  expect(QrCodeParser.isWalletAddress('1L9r8mWmRPndRhuvMCWESLGSVeFzQ9NAWx')).toBe(false);
});

test('QrCodeParser valid MetaMask address', () => {
  expect(QrCodeParser.parseMetaMaskAddress('ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561@1')).toBe(
    '0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561'
  );
});

test('QrCodeParser valid MetaMask address(without chainId)', () => {
  expect(QrCodeParser.parseMetaMaskAddress('ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561')).toBe('0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561');
});

test('QrCodeParser invalid MetaMask address', () => {
  expect(QrCodeParser.parseMetaMaskAddress('ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d56')).toBe(undefined);
});
