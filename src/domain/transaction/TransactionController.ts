import { EventEmitter } from 'events';

import { Result, Transaction, TransactionMeta, TransactionStatus, WalletDevice } from '@metamask/controllers';
import { Mutex } from 'async-mutex';
import { v1 as random } from 'uuid';
import { StoreApi } from 'zustand';

import { NetworkConfig } from '@@constants/network.constant';
import transactionStore, { ITransactionStore } from '@@domain/transaction/transactionStore';

export class TransactionController {
  name: string = 'TransactionController';
  // TODO: hub를 private 으로 만들고 event emit, on 등을 내부에서만 처리하도록 관리하면 더 깔끔해질 수 있을듯
  hub: EventEmitter = new EventEmitter();
  private store: StoreApi<ITransactionStore>;
  private mutex = new Mutex();

  private readonly getSelectedNetworkConfig: () => NetworkConfig;

  constructor({ getSelectedNetworkConfig }: { getSelectedNetworkConfig: () => NetworkConfig }) {
    this.store = transactionStore;
    this.getSelectedNetworkConfig = getSelectedNetworkConfig;
  }
  async addTransaction(transaction: Transaction, origin?: string, deviceConfirmedOn?: WalletDevice): Promise<Result> {
    const networkConfig = this.getSelectedNetworkConfig();
    const networkID = networkConfig.chainId.toString(10);
    const chainId = networkConfig.chainId.toString(10);

    const transactionMeta: TransactionMeta = {
      id: random(),
      networkID,
      chainId,
      origin,
      status: TransactionStatus.unapproved as TransactionStatus.unapproved,
      time: Date.now(),
      transaction,
      deviceConfirmedOn,
      verifiedOnBlockchain: false,
    };

    const result: Promise<string> = new Promise((resolve, reject) => {
      this.hub.once(`${transactionMeta.id}:finished`, (meta: TransactionMeta) => {
        switch (meta.status) {
          case TransactionStatus.submitted:
            return resolve(meta.transactionHash as string);
          case TransactionStatus.rejected:
            const error = new Error('user_rejected_transaction');
            return reject(error);
          default:
            return reject(new Error('transaction_failed'));
        }
      });
    });

    this.store.getState().addTransaction(transactionMeta);
    this.hub.emit('unapprovedTransaction', transactionMeta);
    return { result, transactionMeta };
  }
  async approveTransaction(id: string, sendTransactionFunc: () => Promise<string | undefined>): Promise<void> {
    const { transactions, updateTransaction } = this.store.getState();
    const transactionMeta = transactions.find((t) => t.id === id);
    if (!transactionMeta) {
      throw new Error('transaction_not_found');
    }

    const releaseLock = await this.mutex.acquire();
    try {
      const hash = await sendTransactionFunc();
      transactionMeta.transactionHash = hash;
      transactionMeta.status = TransactionStatus.submitted;
      updateTransaction(id, transactionMeta);
      this.hub.emit(`${transactionMeta.id}:finished`, transactionMeta);
    } catch (e) {
      transactionMeta.status = TransactionStatus.failed;
      this.hub.emit(`${transactionMeta.id}:finished`, transactionMeta);
    } finally {
      releaseLock();
    }
  }

  cancelTransaction(id: string): void {
    const { transactions, updateTransaction } = this.store.getState();
    const transactionMeta = transactions.find((t) => t.id === id);
    if (!transactionMeta) {
      throw new Error('transaction_not_found');
    }
    transactionMeta.status = TransactionStatus.rejected;
    updateTransaction(id, transactionMeta);
    this.hub.emit(`${transactionMeta.id}:finished`, transactionMeta);
  }
}
