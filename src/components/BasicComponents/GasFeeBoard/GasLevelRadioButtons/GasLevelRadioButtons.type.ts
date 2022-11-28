import { TGasLevel } from '@@domain/gas/GasService.type';

export interface IGasLevelRadioButtonsProps {
  setGasLevel: (level: TGasLevel) => void;
  gasLevel: TGasLevel;
}
