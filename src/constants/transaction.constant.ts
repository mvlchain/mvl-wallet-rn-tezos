export const TRANSACTION_TYPE = {
  SEND: 'send',
  RECEIVE: 'recieve',
} as const;

export const TRANSACTION_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  CANCELED: 'Canceled',
} as const;

export const TRANSACTION_HISTORY_FILTER_CRITERIA = {
  ALL: 'All',
  SENT_ONLY: 'Sent Only',
  RECEIVED_ONLY: 'Received Only',
} as const;
