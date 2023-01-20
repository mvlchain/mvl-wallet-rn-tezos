export type LogTag = 'App' | 'Auth' | 'QrPay' | 'Event' | 'DeepLink' | 'ServerShareRepository' | 'Gas';

export type LogConfigs = {
  tags: Set<LogTag>;
};
