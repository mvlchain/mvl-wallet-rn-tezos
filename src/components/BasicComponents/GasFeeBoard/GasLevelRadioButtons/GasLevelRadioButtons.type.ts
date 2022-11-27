import { TGasLevel } from '@@domain/transaction/GasService.type';

export interface IGasLevelRadioButtonsProps {
  setGasLevel: (level: TGasLevel) => void;
  gasLevel: TGasLevel;
}
