import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase } from '@@domain/model/EventPhase';
import { EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { IThirdPartyConnection, IEventThirdParty } from '@@hooks/event/useEventDetailsUiState';
import { extension } from '@@utils/strings';
import { valueOf } from '@@utils/types';

export interface IActionControlAttrs {
  isSvgAvatar: boolean;
  avatarUrl: string;
  actionButtonTitle: string;
  isActionButtonEnabled: boolean;
  eventPointInfoList: IEventPointInfo[];
  isClaimCompleted?: boolean;
}

export interface IEventPointInfo {
  title: string;
  amount: string;
  currency: string;
  subAmount?: string;
  subCurrency?: string;
}

/**
 * collects data for EventActionControl by EventPhase
 */
export const useActionControlsByPhase = (
  phase: valueOf<typeof EventPhase>,
  event: EarnEventDto,
  thirdParty: IEventThirdParty,
  claimStatusInfo: ClaimStatusInformation | undefined
): IActionControlAttrs => {
  const { t } = useTranslation();

  const [actionControlAttrs, setActionControlAttrs] = useState<IActionControlAttrs>(
    getInitialActionControls(phase, event, thirdParty, claimStatusInfo)
  );

  useEffect(() => {
    const attrs = setUpActionControls(phase, event, thirdParty, claimStatusInfo, t);
    setActionControlAttrs(attrs);
  }, [phase, event, thirdParty, claimStatusInfo]);

  return actionControlAttrs;
};

/**
 * Set default ActionControl attributes
 */
function getInitialActionControls(
  phase: valueOf<typeof EventPhase>,
  event: EarnEventDto,
  thirdParty: IEventThirdParty,
  claimStatusInfo: ClaimStatusInformation | undefined
): IActionControlAttrs {
  const isButtonEnabled = isActionButtonEnabled(phase, thirdParty.thirdPartyConnection, claimStatusInfo, thirdParty.isThirdPartySupported);

  let avatarUrl = '';
  if (phase === EventPhase.OnClaim && claimStatusInfo) {
    avatarUrl = claimStatusInfo.subCurrencyIconUrl ? claimStatusInfo.subCurrencyIconUrl : claimStatusInfo.currencyIconUrl;
  } else {
    avatarUrl = event.pointIconUrl;
  }

  return {
    isSvgAvatar: isSvg(avatarUrl),
    avatarUrl: avatarUrl,
    actionButtonTitle: event.eventActionButtonTitle ?? '',
    isActionButtonEnabled: isButtonEnabled,
    eventPointInfoList: thirdParty.points.map((point) => {
      return {
        title: point.title,
        amount: point.amount,
        currency: point.currency,
      };
    }),
  };
}

function setUpActionControls(
  phase: valueOf<typeof EventPhase>,
  event: EarnEventDto,
  thirdParty: IEventThirdParty,
  claimStatusInfo: ClaimStatusInformation | undefined,
  t: (key: string) => string
): IActionControlAttrs {
  const isButtonEnabled = isActionButtonEnabled(phase, thirdParty.thirdPartyConnection, claimStatusInfo, thirdParty.isThirdPartySupported);

  const eventControlAttrs = (): IActionControlAttrs => ({
    isSvgAvatar: isSvg(event.pointIconUrl),
    avatarUrl: event.pointIconUrl,
    actionButtonTitle: event.eventActionButtonTitle ?? '',
    isActionButtonEnabled: isButtonEnabled,
    eventPointInfoList: thirdParty.points.map((point) => {
      return {
        title: point.title,
        amount: point.amount,
        currency: point.currency,
      };
    }),
  });

  const claimControlAttrs = (): IActionControlAttrs => ({
    isSvgAvatar: isSvg(event.pointIconUrl),
    avatarUrl: event.pointIconUrl,
    actionButtonTitle: t('claim'),
    isActionButtonEnabled: isButtonEnabled,
    eventPointInfoList: thirdParty.points.map((point) => {
      return {
        title: point.title,
        amount: point.amount,
        currency: point.currency,
      };
    }),
  });

  switch (phase) {
    case EventPhase.BeforeEvent: {
      return eventControlAttrs();
    }
    case EventPhase.OnEvent: {
      return {
        isSvgAvatar: isSvg(event.pointIconUrl),
        avatarUrl: event.pointIconUrl,
        actionButtonTitle: event.eventActionButtonTitle ?? '',
        isActionButtonEnabled: isButtonEnabled,
        eventPointInfoList: thirdParty.points.map((point) => {
          return {
            title: point.title,
            amount: point.amount,
            currency: point.currency,
          };
        }),
      };
      // onActionButtonPress -> redirect event.eventActionScheme
    }
    case EventPhase.BeforeClaim: {
      return claimControlAttrs();
    }

    case EventPhase.OnClaim: {
      if (!claimStatusInfo) {
        return claimControlAttrs();
      }

      const avatarUrl = claimStatusInfo.subCurrencyIconUrl ? claimStatusInfo.subCurrencyIconUrl : claimStatusInfo.currencyIconUrl;

      /**
       * COMPLETED: already claimed.
       * COMPLETED_TRANSFER: rewarding is in progress
       * isAllowParticipationInClaim: a flat that the users are allowed to claim multiple times
       */
      const isClaimCompleted =
        !event.isAllowParticipationInClaim || claimStatusInfo.status === 'COMPLETED' || claimStatusInfo.status === 'COMPLETED_TRANSFER';
      return {
        isSvgAvatar: isSvg(avatarUrl),
        avatarUrl,
        actionButtonTitle: isClaimCompleted ? t('claimed') : t('claim'),
        isActionButtonEnabled: isButtonEnabled,
        eventPointInfoList: [
          {
            title: t('event_action_claimable_value_title'),
            amount: claimStatusInfo.amount,
            currency: claimStatusInfo.currency,
            subAmount: claimStatusInfo.subCurrencyAmount ?? undefined,
            subCurrency: claimStatusInfo.subCurrency ?? undefined,
          },
        ],
        isClaimCompleted,
      };
      // onActionButtonPress -> do claim request by alerting claim confirm modal
    }

    default:
      return eventControlAttrs();
  }
}
/**
 * claim confirm modal에서 confirm을 눌렀을 때 wallet modal을 띄우는 법
 * 1. event에 해당하는 Network(ETH, TEZOS 등)와 onClaim버튼을 눌렀을 때 동작할 onPressClaim 함수를 param으로 useClaimWalletListModal을 호출한다.
 * const { wallet } = useClaimWalletListModal({ netowrk, onPressClaim });
 * 2. claim wallet modal을 띄운다.
 * openModal({menuList: wallet});
 */

/**
 * is event action button enabled.
 */
function isActionButtonEnabled(
  phase: valueOf<typeof EventPhase>,
  thirdPartyConnection: IThirdPartyConnection | undefined,
  claimInfo: EarnEventGetClaimResponseDto | undefined,
  isThirdPartySupported: boolean
): boolean {
  const isThirdPartyConnected = thirdPartyConnection?.exists === true;
  const isOnEvent = phase == EventPhase.OnEvent;
  const isAbleToClaim = phase == EventPhase.OnClaim && !!claimInfo?.isClaimable;
  return (!isThirdPartySupported || isThirdPartyConnected) && (isOnEvent || isAbleToClaim);
}

function isSvg(file: string): boolean {
  return extension(file) === 'svg';
}