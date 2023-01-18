import { TransactionMeta } from '@metamask/controllers';
import createStore from 'zustand/vanilla';

export interface ITransactionStoreState {
  transactions: TransactionMeta[];
}

const INITIAL_TRANSACTIONS_STATE: ITransactionStoreState = {
  transactions: [],
};

export interface ITransactionStore extends ITransactionStoreState {
  resetTransactions: () => void;
  addTransaction: (transaction: TransactionMeta) => void;
  updateTransaction: (id: string, transaction: TransactionMeta) => void;
}

const transactionStore = createStore<ITransactionStore>((set, get) => ({
  ...INITIAL_TRANSACTIONS_STATE,
  resetTransactions: () => {
    set({
      transactions: [],
    });
  },
  addTransaction: (transaction: TransactionMeta) => {
    set({
      transactions: [...get().transactions, transaction],
    });
  },
  updateTransaction: (id: string, transaction: TransactionMeta) => {
    const { transactions } = get();
    const idx = transactions.findIndex((t) => t.id === id);
    transactions[idx] = transaction;
    set({
      transactions,
    });
  },
}));

export default transactionStore;
