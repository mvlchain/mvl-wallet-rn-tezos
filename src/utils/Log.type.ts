export type LogTag = 'Auth' | 'QrPay' | 'Event';

export type LogConfigs = {
  tags: Set<LogTag>;
};
