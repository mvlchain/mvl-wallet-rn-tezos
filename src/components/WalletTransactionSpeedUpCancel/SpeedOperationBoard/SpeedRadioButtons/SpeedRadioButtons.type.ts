import { TGasLevel } from '@@domain/transaction/GasService.type';

export interface ISpeedRadioButtonsProps {
  setGasLevel: (level: TGasLevel) => void;
  gasLevel: TGasLevel;
}
