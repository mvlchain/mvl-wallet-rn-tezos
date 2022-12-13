export type TimeDuration = {
  amount: number;
  unit: TimeDurationUnit;
};

// TODO enum을 const enum으로 변경할 것
export enum TimeDurationUnit {
  Minute,
  Hour,
  Day,
}
