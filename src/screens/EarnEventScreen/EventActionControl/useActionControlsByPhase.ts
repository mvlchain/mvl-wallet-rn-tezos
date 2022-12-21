/* eslint-disable max-lines */
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useClaimWalletListModal from '@@components/BasicComponents/Modals/ClaimWalletListModal/useClaimWalletListModal';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { NetworkId, networkIdToNetworkByBase } from '@@constants/network.constant';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase } from '@@domain/model/EventPhase';
import { EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import { IEventThirdParty, IThirdPartyConnection } from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreentype';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { extension, format } from '@@utils/strings';
import { valueOf } from '@@utils/types';

import { IActionControlAttrs } from './EventActionControl.type';

/**
 * collects data for EventActionControl by EventPhase
 */
export const useActionControlsByPhase = (
  phase: valueOf<typeof EventPhase>,
  event: EarnEventDto,
  thirdParty: IEventThirdParty,
  claimStatusInfo: ClaimStatusInformation | undefined
): IActionControlAttrs => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const [actionControlAttrs, setActionControlAttrs] = useState<IActionControlAttrs>(
    getInitialActionControls(phase, event, thirdParty, claimStatusInfo)
  );

  const onPressClaim = (address: string) => {
    rootNavigation.navigate('EARN_EVENT_TRNASFERRING', { address, eventId: event.id });
  };

  const networkId = event.network as NetworkId;

  const network = networkIdToNetworkByBase(networkId);
  const { wallet } = useClaimWalletListModal({ network: network, onPressClaim });
  const openClaimWalletListModal = () => {
    openModal(MODAL_TYPES.CLAIM_WALLET_LIST, { menuList: wallet });
  };

  useEffect(() => {
    const attrs = setUpActionControls(phase, event, thirdParty, claimStatusInfo, t);
    setActionControlAttrs(attrs);
  }, [phase, event, thirdParty, claimStatusInfo]);

  const openConfirmClaimModal = () => {
    if (!claimStatusInfo) return;
    if (parseFloat(claimStatusInfo?.amount) > parseFloat(claimStatusInfo?.fee)) {
      const appName = event.app?.name.toUpperCase() ?? '';
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: t('btn_confirm'),
        label: format(t('dialog_claim_confirm_description'), appName, appName),
        onConfirm: openClaimWalletListModal,
        confirmLabel: t('claim'),
        onCancel: closeModal,
        disableCloseByConfirm: true,
      });
    } else {
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: t('dialog_claim_failed_title'),
        label: t('dialog_claim_failed_description'),
        onConfirm: closeModal,
        confirmLabel: t('btn_confirm'),
      });
    }
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
    const isButtonEnabled = isActionButtonEnabled(phase, thirdParty.connection, claimStatusInfo, thirdParty.isThirdPartySupported);

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
    const isButtonEnabled = isActionButtonEnabled(phase, thirdParty.connection, claimStatusInfo, thirdParty.isThirdPartySupported);

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
          onActionButtonPress: openConfirmClaimModal,
        };
      }

      default:
        return eventControlAttrs();
    }
  }

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

  return actionControlAttrs;
};
