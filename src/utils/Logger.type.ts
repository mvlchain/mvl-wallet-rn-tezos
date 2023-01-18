export type LogTag = 'App' | 'Auth' | 'QrPay' | 'Event' | 'DeepLink' | 'ServerShareRepository';

export type LogConfigs = {
  tags: Set<LogTag>;
};
