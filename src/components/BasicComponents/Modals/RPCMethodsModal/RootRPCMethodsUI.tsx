/* eslint-disable max-lines */

import React, { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Button, InteractionManager, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import rpcMethodsUiStore from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUIStore';
import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { mmLightColors } from '@@style/colors';
import { ApprovalTypes } from '@@utils/BackgroundBridge/RPCMethodMiddleware';
import { tagLogger } from '@@utils/Logger';
import { fromWei, hexToBN } from '@@utils/number';

import Approval from './Approval';

export const KEYSTONE_TX_CANCELED = 'KeystoneError#Tx_canceled';

const logger = tagLogger('RootRPCMethodsUI');

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
const RootRPCMethodsUI = () => {
  const colors = mmLightColors;
  const blockChainService = useDi('WalletBlockChainService');
  const signMessageService = useDi('SignMessageService');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const [showPendingApproval, setShowPendingApproval] = useState<any>(false);
  const [signMessageParams, setSignMessageParams] = useState<any>({ data: '' });
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
    logger.log(`onUnapprovedMessage: ${type} ${JSON.stringify(messageParams, null, 2)}`);
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
      logger.log(`WB INCOMING> 8. onUnapprovedTransaction transactionMeta: ${JSON.stringify(transactionMeta, null, 2)}`);
      if (transactionMeta.origin === 'MetaMask Mobile') return;

      const to = transactionMeta.transaction.to?.toLowerCase();

      const {
        transaction: { value, gas, gasPrice, data },
      } = transactionMeta;

      const { symbol, decimals } = await blockChainService.getMetadata(getNetworkByBase(selectedNetwork), to);
      const asset = { symbol, decimals, address: to };
      logger.log('asset:  ', asset);
      transactionMeta.transaction.gas = hexToBN(gas);
      transactionMeta.transaction.gasPrice = gasPrice && hexToBN(gasPrice);

      const valueWithDefaultZero = value || '0';
      transactionMeta.transaction.value = hexToBN(valueWithDefaultZero);
      transactionMeta.transaction.readableValue = fromWei(transactionMeta.transaction.value);

      // TODO: tx 정보 통합
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

  const onSignConfirmAction = async () => {
    const messageParams = signMessageParams;
    const { typedMessageManager } = controllerManager;
    const messageId = messageParams.metamaskId;
    const version = messageParams.version;
    let rawSig;
    let cleanMessageParams;
    try {
      cleanMessageParams = await typedMessageManager.approveMessage(messageParams);
      console.log(`cleanMessageParams: ${JSON.stringify(cleanMessageParams, null, 2)}, version: ${version}`);
      const index = selectedWalletIndex[selectedNetwork] || 0;
      rawSig = await signMessageService.signTypedMessage(getNetworkByBase(selectedNetwork), index, cleanMessageParams, version);
      typedMessageManager.setMessageStatusSigned(messageId, rawSig);
    } catch (error: any) {
      typedMessageManager.setMessageStatusSigned(messageId, error.message);
    }
    setShowPendingApproval(false);
  };
  const onSignRejectAction = () => {
    const messageParams = signMessageParams;
    const { typedMessageManager } = controllerManager;
    const messageId = messageParams.metamaskId;
    typedMessageManager.rejectMessage(messageId);
    setShowPendingApproval(false);
  };

  const toggleExpandedMessage = () => setShowExpandedMessage(!showExpandedMessage);

  const renderTypedMessageV3 = (obj: any) => {
    return Object.keys(obj).map((key) => (
      <View key={key}>
        {obj[key] && typeof obj[key] === 'object' ? (
          <View>
            <Text>{key}:</Text>
            <View>{renderTypedMessageV3(obj[key])}</View>
          </View>
        ) : (
          <Text>
            <Text>{key}:</Text> {`${obj[key]}`}
          </Text>
        )}
      </View>
    ));
  };

  const renderTypedMessage = (messageParams: any) => {
    if (messageParams.version === 'V1') {
      return (
        <View>
          {messageParams.data.map((obj: any, i: number) => (
            <View key={`${obj.name}_${i}`}>
              <Text>{obj.name}:</Text>
              <Text key={obj.name}>{` ${obj.value}`}</Text>
            </View>
          ))}
        </View>
      );
    }
    if (messageParams.version === 'V3' || messageParams.version === 'V4') {
      const { message } = JSON.parse(messageParams.data);
      return renderTypedMessageV3(message);
    }
  };

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
      onBackdropPress={onSignRejectAction}
      onBackButtonPress={showExpandedMessage ? toggleExpandedMessage : onSignRejectAction}
      swipeDirection={'down'}
      propagateSwipe
    >
      {signType === 'typed' && renderTypedMessage(signMessageParams)}
      <Button title={'Sign'} onPress={onSignConfirmAction} />
      <Button title={'Cancel'} onPress={onSignRejectAction} />
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
      logger.log(error, 'Reject while rejecting pending connection request');
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
    const { messageManager, personalMessageManager, typedMessageManager } = controllerManager;
    messageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'eth'));

    personalMessageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'personal'));

    typedMessageManager.hub.on('unapprovedMessage', (messageParams) => onUnapprovedMessage(messageParams, 'typed'));

    // controllerMessenger.subscribe('ApprovalController:stateChange', handlePendingApprovals);

    return function cleanup() {
      personalMessageManager.hub.removeAllListeners();
      typedMessageManager.hub.removeAllListeners();
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
    </React.Fragment>
  );
};

export default RootRPCMethodsUI;
