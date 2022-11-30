import { TimeDurationUnit } from './TimeDuration.type';
import { parseTimeDuration } from './parseTimeDuration';

describe('TimeDuration', () => {
  it('days duration', () => {
    const current = new Date('2022-11-10T23:00:00.000Z');
    const target = new Date('2022-11-12T23:00:00.000Z');
    const duration = parseTimeDuration(current, target);

    expect(duration?.amount ?? 0).toBe(2);
    expect(duration?.unit).toBe(TimeDurationUnit.Day);
  });

  it('hours duration', () => {
    const current = new Date('2022-11-12T20:00:00.000Z');
    const target = new Date('2022-11-12T23:00:00.000Z');
    const duration = parseTimeDuration(current, target);

    expect(duration?.amount ?? 0).toBe(3);
    expect(duration?.unit).toBe(TimeDurationUnit.Hour);
  });

  it('minutes duration', () => {
    const current = new Date('2022-11-12T23:00:00.000Z');
    const target = new Date('2022-11-12T23:20:00.000Z');
    const duration = parseTimeDuration(current, target);

    expect(duration?.amount ?? 0).toBe(20);
    expect(duration?.unit).toBe(TimeDurationUnit.Minute);
  });

  it('zero duration with a value less then a minute', () => {
    const current = new Date('2022-11-12T23:00:00.000Z');
    const target = new Date('2022-11-12T23:00:20.000Z');
    const duration = parseTimeDuration(current, target);

    expect(duration).toBeNull();
  });

  it('zero duration with equal time', () => {
    const current = new Date('2022-11-12T23:00:00.000Z');
    const target = new Date('2022-11-12T23:00:00.000Z');
    const duration = parseTimeDuration(current, target);

    expect(duration).toBeNull();
  });
});
