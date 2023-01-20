// Just for autocomplete suggestion or tags over multiple components, otherwise string is enough
export type LogTag = 'App' | 'Auth' | 'QrPay' | 'Event' | 'DeepLink' | 'ServerShareRepository' | 'Gas' | string;

export type LogConfigs = {
  tags: Set<LogTag>;
};
