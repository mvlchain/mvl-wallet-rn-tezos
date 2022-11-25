import { container } from 'tsyringe';

import { DiModuleTypes } from '../di/DiModuleTypes';

/**
 * ex) const tradeService = useDi('TradeService');
 * @param key a token to call di module instance
 * @returns a di registered module instance.
 */
export const useDi = <K extends keyof DiModuleTypes>(key: K): DiModuleTypes[K] => container.resolve(key);
