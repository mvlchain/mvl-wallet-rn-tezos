import { AUTH_STAGE } from '@@constants/authStage.constant';

export interface IAuthPersist extends IAuthPersistState {
  setStage: (postboxKey: string, stage: keyof typeof AUTH_STAGE) => void;
  removeStageByPostboxKey: (postboxKey: string) => void;
}

export interface IAuthPersistState {
  stage: TStage;
}

export type TStage = {
  [key: string]: keyof typeof AUTH_STAGE;
};
