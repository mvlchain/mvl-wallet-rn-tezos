export const TRANSACTION_HISTORY_FILTER_CRITERIA = {
  ALL: 'All',
  SENT_ONLY: 'Sent Only',
  RECEIVED_ONLY: 'Received Only',
} as const;

export const TRANSACTION_METHOD = {
  TRANSFER: 'transfer',
} as const;

export const TRANSFER_FUNCTION_SIGNATURE = '0xa9059cbb';
