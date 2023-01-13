export type LogTag = 'Auth' | 'QrPay';

export type LogConfigs = {
  tags: Set<LogTag>;
};
