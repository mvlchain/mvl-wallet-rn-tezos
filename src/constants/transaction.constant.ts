export const TRANSACTION_HISTORY_FILTER_CRITERIA = {
  ALL: 'All',
  SENT_ONLY: 'Sent Only',
  RECEIVED_ONLY: 'Received Only',
} as const;

export const GAS_LEVEL = {
  LOW: '0.75',
  MID: '1',
  HIGH: '1.5',
} as const;
