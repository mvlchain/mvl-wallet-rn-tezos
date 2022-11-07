export const TRANSACTION_TYPE = {
  SEND: 'send',
  RECEIVE: 'recieve',
} as const;

export const TRANSACTION_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  canceled: 'Canceled',
} as const;
