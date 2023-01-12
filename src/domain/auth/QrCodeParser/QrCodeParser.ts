import { parse } from 'url';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import { validateAddress, ValidationResult } from '@taquito/utils';
import { ethers } from 'ethers';
import QueryString from 'qs';

import { URL_DYNAMIC_LINK, URL_DEEPLINK } from '@@constants/url.constant';
import { evaluateQueryString, REGEX_METAMASK_ADDRESS } from '@@utils/regex';
import { isBlank, isNotBlank } from '@@utils/strings';

import { QrCodeLinkTransfer } from './QrCodeParser.type';

export default class QrCodeParser {
  /**
   * decode different type of QrCodes such as URL_DYNAMIC_LINK or URL_DEEPLINK
   *
   * @static
   * @param qrCode QrCodes string
   * @returns decoded QrCodeLinkTransfer object or undefined if failed to parse QrCode
   */
  static decodeQrCode = async (qrCode: string): Promise<QrCodeLinkTransfer | undefined> => {
    let deepLink: string | undefined;
    /*
     * DynamicLink if it starts with
     *  - URL_DYNAMIC_LINK
     *  - URL_DEEPLINK
     *  - MetaMask
     *
     * Dynamic Link format
     * https://link.mvlclutch.io/short
     *   ?link={URL ENCODED DeepLink}
     *   &apn=io.mvlchain.wallet&afl={android_fallback_link}
     *   &ibi=io.mvlchain.wallet&ius=clutchwallet&isi=1598853856&ifl={ios_fallback_link}
     */
    if (qrCode.startsWith(`https://${URL_DYNAMIC_LINK}`)) {
      const dynamicLink = await dynamicLinks().resolveLink(qrCode);
      console.log(`QrPay> resovled DynamicLink: ${dynamicLink.url}`);
      deepLink = dynamicLink.url;
    } else if (qrCode.startsWith(`https://${URL_DEEPLINK}`)) {
      deepLink = qrCode;
    }

    if (deepLink) {
      return this.parseLinkTransferQrCode(deepLink);
    }

    // MetaMask
    const metaMaskAddress = this.parseMetaMaskAddress(qrCode);
    if (metaMaskAddress) {
      console.log(`QrPay> MetaMask address: ${metaMaskAddress}`);
      return {
        network: 'ETHEREUM',
        address: metaMaskAddress,
      } as QrCodeLinkTransfer;
    }
    return;
  };

  /**
   * parse deeplink starting with l.mvlclutch.io/link-transfer
   * DeepLink format
   * https://l.mvlclutch.io/link-transfer/{network}/?tokenAddress={tokenAddress:optional}&address={toAddress}&value={amount:optional}
   * https://l.mvlclutch.io/link-transfer/ETHEREUM
   *   /?tokenAddress=0x3e39300683cf271e067e22431f4c66bb0778a3eb&address=0x6CeE88A4298C937ac992Bf7c1806680f6c0d7637&value=100000000000000000
   *
   * @static
   * @return QrCodeLinkTransfer
   */
  static parseLinkTransferQrCode = (deepLink: string): QrCodeLinkTransfer | undefined => {
    const qs = evaluateQueryString(deepLink);
    if (isNotBlank(qs) && deepLink.startsWith(`https://${URL_DEEPLINK}/link-transfer`)) {
      const url = parse(deepLink);
      const paths = url.pathname?.split('/');
      let network: string | undefined;

      /*
       * [3, 4] will cover the following cases
       *  - https://l.mvlclutch.io/link-transfer/{network}/?tokenAddress
       *  - https://l.mvlclutch.io/link-transfer/{network}?tokenAddress
       */
      if ([3, 4].includes(paths?.length ?? 0)) {
        network = paths![2];
      }

      if (isBlank(network)) {
        console.warn(`QrPay> cannot find network!`);
        return;
      }

      const params = QueryString.parse(qs!);
      console.log(`QrPay> network: ${network}, params: ${JSON.stringify(params)}`);
      return {
        network: network,
        contractAddress: params.tokenAddress,
        address: this.parseAddressByType(params.address as string),
        amount: params.value,
      } as QrCodeLinkTransfer;
    }
    return;
  };

  /**
   * parse different type of wallet addresses
   *
   * 0x0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561
   * ethereum:<address>@<chainId>
   *
   * @param address wallet address
   *  - ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561
   *  - ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561@1
   *  - 0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561
   *  - 83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561
   * @return filtered wallet address
   */
  static parseAddressByType = (address: string): string => {
    if (address.includes('@')) {
      return address.substring(address.indexOf('0x'), address.indexOf('@'));
    } else if (address.includes('0x')) {
      return address.substring(address.indexOf('0x'), address.length);
    }
    return address;
  };

  /**
   * Clutch에서 지원하는 지갑 주소의 형식인지 확인한다.
   * 현재는 아래의 지값 주소들을 확인한다.
   *  - etherum
   *  - binance (etherum과 동일)
   *  - tezos
   * @param address
   */
  static isWalletAddress(address: string): boolean {
    return ethers.utils.isAddress(address) || validateAddress(address) == ValidationResult.VALID;
  }

  /**
   * 메타마스크에서 지원하는 지갑이라면 주소를 가져온다
   * @param address ex) ethereum:0x83Fd6891c30238bCEaD0F5bb3dBB7C43Ff11d561@1
   */
  static parseMetaMaskAddress(address: string): string | undefined {
    const res = REGEX_METAMASK_ADDRESS.exec(address);
    return res?.[2];
  }
}
