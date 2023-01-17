export type LogTag = 'Auth' | 'QrPay' | 'Event' | 'DeepLink';

export type LogConfigs = {
  tags: Set<LogTag>;
};
