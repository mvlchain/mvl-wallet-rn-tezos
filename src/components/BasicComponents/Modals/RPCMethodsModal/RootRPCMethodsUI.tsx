/* eslint-disable max-lines */

import React, { useState, useEffect, useCallback } from 'react';

import { BigNumber } from 'bignumber.js';
import BN from 'bn.js';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Alert, InteractionManager, Button } from 'react-native';
import Modal from 'react-native-modal';

import rpcMethodsUiStore from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUIStore';
import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import { mmLightColors } from '@@style/colors';
import { ApprovalTypes } from '@@utils/BackgroundBridge/RPCMethodMiddleware';
import { hexToBN, fromWei } from '@@utils/number';

import Approval from './Approval';

export const KEYSTONE_TX_CANCELED = 'KeystoneError#Tx_canceled';

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
const RootRPCMethodsUI = () => {
  const colors = mmLightColors;
  // FIXME: chainId
  const [showPendingApproval, setShowPendingApproval] = useState<any>(false);
  const [signMessageParams, setSignMessageParams] = useState({ data: '' });
  const [signType, setSignType] = useState<any>(false);
  const [showExpandedMessage, setShowExpandedMessage] = useState(false);
  const [currentPageMeta, setCurrentPageMeta] = useState({});

  const [customNetworkToAdd, setCustomNetworkToAdd] = useState<any>(null);
  const [customNetworkToSwitch, setCustomNetworkToSwitch] = useState<any>(null);

  const [hostToApprove, setHostToApprove] = useState<any>(null);

  const [watchAsset, setWatchAsset] = useState(false);
  const { t: strings } = useTranslation();
  const {
    setTransaction: setEtherTransaction,
    toggleDappTransactionModal,
    dappTransactionModalVisible,
    approveModalVisible,
    toggleApproveModal,
  } = rpcMethodsUiStore();
  const { setState: setTransactionRequest } = transactionRequestStore();

  const showPendingApprovalModal = ({ type, origin }: any) => {
    InteractionManager.runAfterInteractions(() => {
      setShowPendingApproval({ type, origin });
    });
  };

  const onUnapprovedMessage = (messageParams: any, type: any) => {
    setCurrentPageMeta(messageParams.meta);
    const signMessageParams = { ...messageParams };
    delete signMessageParams.meta;
    setSignMessageParams(signMessageParams);
    setSignType(type);
    showPendingApprovalModal({
      type: ApprovalTypes.SIGN_MESSAGE,
      origin: signMessageParams.origin,
    });
  };

  const onUnapprovedTransaction = useCallback(
    async (transactionMeta: any) => {
      console.log(`WB INCOMING> 8. onUnapprovedTransaction transactionMeta: ${JSON.stringify(transactionMeta, null, 2)}`);
      if (transactionMeta.origin === 'MetaMask Mobile') return;

      const to = transactionMeta.transaction.to?.toLowerCase();

      const {
        transaction: { value, gas, gasPrice, data },
      } = transactionMeta;

      const asset = { symbol: 'ERC20', decimals: new BN('18'), address: to };

      transactionMeta.transaction.gas = hexToBN(gas);
      transactionMeta.transaction.gasPrice = gasPrice && hexToBN(gasPrice);

      const valueWithDefaultZero = value || '0';
      transactionMeta.transaction.value = hexToBN(valueWithDefaultZero);
      transactionMeta.transaction.readableValue = fromWei(transactionMeta.transaction.value);

      setEtherTransaction({
        id: transactionMeta.id,
        selectedAsset: asset,
        origin: transactionMeta.origin,
        ...transactionMeta.transaction,
      });
      setTransactionRequest({
        from: transactionMeta.transaction.from,
        to: transactionMeta.transaction.to,
        value: new BigNumber(valueWithDefaultZero),
        data: transactionMeta.transaction.data,
        toValid: true,
        valueValid: true,
      });

      toggleDappTransactionModal();
    },
    [setEtherTransaction, toggleDappTransactionModal]
  );

  const onSignAction = () => setShowPendingApproval(false);

  const toggleExpandedMessage = () => setShowExpandedMessage(!showExpandedMessage);

  const renderSigningModal = () => (
    <Modal
      isVisible={showPendingApproval?.type === ApprovalTypes.SIGN_MESSAGE}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      style={styles.bottomModal}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      animationInTiming={600}
      animationOutTiming={600}
      onBackdropPress={onSignAction}
      onBackButtonPress={showExpandedMessage ? toggleExpandedMessage : onSignAction}
      onSwipeComplete={onSignAction}
      swipeDirection={'down'}
      propagateSwipe
    >
      <Button title={'Sign'} onPress={onSignAction} />
      {/*{signType === 'personal' && (*/}
      {/*  <PersonalSign*/}
      {/*    navigation={navigation}*/}
      {/*    messageParams={signMessageParams}*/}
      {/*    onCancel={onSignAction}*/}
      {/*    onConfirm={onSignAction}*/}
      {/*    currentPageInformation={currentPageMeta}*/}
      {/*    toggleExpandedMessage={toggleExpandedMessage}*/}
      {/*    showExpandedMessage={showExpandedMessage}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{signType === 'typed' && (*/}
      {/*  <TypedSign*/}
      {/*    navigation={navigation}*/}
      {/*    messageParams={signMessageParams}*/}
      {/*    onCancel={onSignAction}*/}
      {/*    onConfirm={onSignAction}*/}
      {/*    currentPageInformation={currentPageMeta}*/}
      {/*    toggleExpandedMessage={toggleExpandedMessage}*/}
      {/*    showExpandedMessage={showExpandedMessage}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{signType === 'eth' && (*/}
      {/*  <MessageSign*/}
      {/*    navigation={navigation}*/}
      {/*    messageParams={signMessageParams}*/}
      {/*    onCancel={onSignAction}*/}
      {/*    onConfirm={onSignAction}*/}
      {/*    currentPageInformation={currentPageMeta}*/}
      {/*    toggleExpandedMessage={toggleExpandedMessage}*/}
      {/*    showExpandedMessage={showExpandedMessage}*/}
      {/*  />*/}
      {/*)}*/}
    </Modal>
  );

  const renderDappTransactionModal = () => dappTransactionModalVisible && <Approval isVisible={dappTransactionModalVisible} />;

  const renderApproveModal = () =>
    approveModalVisible && (
      <Modal>
        <Button title={'Approve'} onPress={toggleApproveModal} />
      </Modal>
    );
  const rejectPendingApproval = (id: any, error: any) => {
    // const { ApprovalController } = Engine.context;
    try {
      // ApprovalController.reject(id, error);
    } catch (error) {
      console.log(error, 'Reject while rejecting pending connection request');
    }
  };

  const acceptPendingApproval = (id: any, requestData: any) => {
    // const { ApprovalController } = Engine.context;
    // ApprovalController.accept(id, requestData);
  };

  const onAddCustomNetworkReject = () => {
    setShowPendingApproval(false);
    // rejectPendingApproval(customNetworkToAdd.id, ethErrors.provider.userRejectedRequest());
  };

  const onAddCustomNetworkConfirm = () => {
    setShowPendingApproval(false);
    // acceptPendingApproval(customNetworkToAdd.id, customNetworkToAdd.data);
  };

  /**
   * Render the modal that asks the user to approve/reject connections to a dapp
   */
  const renderAddCustomNetworkModal = () => (
    <Modal
      isVisible={showPendingApproval?.type === ApprovalTypes.ADD_ETHEREUM_CHAIN}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      style={styles.bottomModal}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      animationInTiming={300}
      animationOutTiming={300}
      onSwipeComplete={onAddCustomNetworkReject}
      onBackdropPress={onAddCustomNetworkReject}
    >
      <Button title={'Add'} onPress={onAddCustomNetworkConfirm} />
      {/*<AddCustomNetwork*/}
      {/*  onCancel={onAddCustomNetworkReject}*/}
      {/*  onConfirm={onAddCustomNetworkConfirm}*/}
      {/*  currentPageInformation={currentPageMeta}*/}
      {/*  customNetworkInformation={customNetworkToAdd?.data}*/}
      {/*/>*/}
    </Modal>
  );

  const onSwitchCustomNetworkReject = () => {
    setShowPendingApproval(false);
    // rejectPendingApproval(customNetworkToSwitch.id, ethErrors.provider.userRejectedRequest());
  };

  const onSwitchCustomNetworkConfirm = () => {
    setShowPendingApproval(false);
    // acceptPendingApproval(customNetworkToSwitch.id, customNetworkToSwitch.data);
    // props.networkSwitched({
    //   networkUrl: customNetworkToSwitch.data.rpcUrl,
    //   networkStatus: true,
    // });
  };

  /**
   * Render the modal that asks the user to approve/reject connections to a dapp
   */
  const renderSwitchCustomNetworkModal = () => (
    <Modal
      isVisible={showPendingApproval?.type === ApprovalTypes.SWITCH_ETHEREUM_CHAIN}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      style={styles.bottomModal}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      animationInTiming={300}
      animationOutTiming={300}
      onSwipeComplete={onSwitchCustomNetworkReject}
      onBackdropPress={onSwitchCustomNetworkReject}
      swipeDirection={'down'}
    >
      <Button title={'Switch'} onPress={onSwitchCustomNetworkConfirm} />
      {/*<SwitchCustomNetwork*/}
      {/*  onCancel={onSwitchCustomNetworkReject}*/}
      {/*  onConfirm={onSwitchCustomNetworkConfirm}*/}
      {/*  currentPageInformation={currentPageMeta}*/}
      {/*  customNetworkInformation={customNetworkToSwitch?.data}*/}
      {/*  type={customNetworkToSwitch?.data.type}*/}
      {/*/>*/}
    </Modal>
  );

  /**
   * When user clicks on approve to connect with a dapp
   */
  const onAccountsConfirm = () => {
    acceptPendingApproval(hostToApprove.id, hostToApprove.requestData);
    setShowPendingApproval(false);
  };

  /**
   * When user clicks on reject to connect with a dapp
   */
  const onAccountsReject = () => {
    rejectPendingApproval(hostToApprove.id, hostToApprove.requestData);
    setShowPendingApproval(false);
  };

  /**
   * Render the modal that asks the user to approve/reject connections to a dapp
   */
  const renderAccountsApprovalModal = () => (
    <Modal
      isVisible={showPendingApproval?.type === ApprovalTypes.CONNECT_ACCOUNTS}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      style={styles.bottomModal}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      animationInTiming={300}
      animationOutTiming={300}
      onSwipeComplete={onAccountsReject}
      onBackdropPress={onAccountsReject}
      swipeDirection={'down'}
    >
      <Button title={'AccountsConfirm'} onPress={onAccountsConfirm} />
    </Modal>
  );

  /**
   * On rejection addinga an asset
   */
  const onCancelWatchAsset = () => {
    setWatchAsset(false);
  };

  /**
   * Render the add asset modal
   */
  const renderWatchAssetModal = () => (
    <Modal
      isVisible={watchAsset}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      style={styles.bottomModal}
      backdropColor={colors.overlay.default}
      backdropOpacity={1}
      animationInTiming={600}
      animationOutTiming={600}
      onBackdropPress={onCancelWatchAsset}
      onSwipeComplete={onCancelWatchAsset}
      swipeDirection={'down'}
      propagateSwipe
    >
      <Button title={'WatchAsset'} onPress={onCancelWatchAsset} />
      {/*<WatchAssetRequest*/}
      {/*  onCancel={onCancelWatchAsset}*/}
      {/*  onConfirm={onCancelWatchAsset}*/}
      {/*  suggestedAssetMeta={suggestedAssetMeta}*/}
      {/*  currentPageInformation={currentPageMeta}*/}
      {/*/>*/}
    </Modal>
  );

  // unapprovedTransaction effect
  useEffect(() => {
    const { transactionController: TransactionController } = controllerManager;
    TransactionController.hub.on('unapprovedTransaction', onUnapprovedTransaction);
    return () => {
      TransactionController.hub.removeListener('unapprovedTransaction', onUnapprovedTransaction);
    };
  }, [onUnapprovedTransaction]);

  const handlePendingApprovals = async (approval: any) => {
    //TODO: IF WE RECEIVE AN APPROVAL REQUEST, AND WE HAVE ONE ACTIVE, SHOULD WE HIDE THE CURRENT ONE OR NOT?

    if (approval.pendingApprovalCount > 0) {
      const key = Object.keys(approval.pendingApprovals)[0];
      const request = approval.pendingApprovals[key];
      const requestData = request.requestData;
      if (requestData.pageMeta) {
        setCurrentPageMeta(requestData.pageMeta);
      }
      switch (request.type) {
        case ApprovalTypes.CONNECT_ACCOUNTS:
          setHostToApprove({ data: requestData, id: request.id });
          showPendingApprovalModal({
            type: ApprovalTypes.CONNECT_ACCOUNTS,
            origin: request.origin,
          });
          break;
        case ApprovalTypes.SWITCH_ETHEREUM_CHAIN:
          setCustomNetworkToSwitch({ data: requestData, id: request.id });
          showPendingApprovalModal({
            type: ApprovalTypes.SWITCH_ETHEREUM_CHAIN,
            origin: request.origin,
          });
          break;
        case ApprovalTypes.ADD_ETHEREUM_CHAIN:
          setCustomNetworkToAdd({ data: requestData, id: request.id });
          showPendingApprovalModal({
            type: ApprovalTypes.ADD_ETHEREUM_CHAIN,
            origin: request.origin,
          });
          break;
        default:
          break;
      }
    } else {
      setShowPendingApproval(false);
    }
  };

  useEffect(() => {
    const { messageManager, personalMessageManager, typedMessageManager, controllerMessenger } = controllerManager;
    messageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'eth'));

    personalMessageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'personal'));

    typedMessageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'typed'));

    // controllerMessenger.subscribe('ApprovalController:stateChange', handlePendingApprovals);

    // Engine.context.TokensController.hub.on('pendingSuggestedAsset', (suggestedAssetMeta) => {
    //   setSuggestedAssetMeta(suggestedAssetMeta);
    //   setWatchAsset(true);
    // });

    return function cleanup() {
      // personalMessageManager.hub.removeAllListeners();
      // typedMessageManager.hub.removeAllListeners();
      // tokensController.hub.removeAllListeners();
    };
  }, []);

  return (
    <React.Fragment>
      {renderSigningModal()}
      {renderDappTransactionModal()}
      {renderApproveModal()}
      {renderAddCustomNetworkModal()}
      {renderSwitchCustomNetworkModal()}
      {renderAccountsApprovalModal()}
      {renderWatchAssetModal()}
    </React.Fragment>
  );
};

export default RootRPCMethodsUI;
