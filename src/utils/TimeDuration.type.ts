export type TimeDuration = {
  amount: number;
  unit: TimeDurationUnit;
};

export enum TimeDurationUnit {
  Minute,
  Hour,
  Day,
}
