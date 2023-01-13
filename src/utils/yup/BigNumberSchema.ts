// ref: https://github.com/PolymathNetwork/polymath-ui/blob/17d1e8b9da215bfb5eb633f3397bcff84903abed/src/validator/schemas/BigNumberSchema.ts
import BigNumber from 'bignumber.js';
import { MixedSchema, SchemaOf } from 'yup';

export class BigNumberSchema extends MixedSchema {
  constructor() {
    super({ type: 'bigNumber' });

    this.transform((value: any) => {
      if ((this as unknown as SchemaOf<BigNumber>).isType(value)) {
        return value;
      }

      try {
        return new BigNumber(value);
      } catch (err) {
        return 'Invalid BigNumber';
      }
    });
  }

  public _typeCheck(value: any): value is NonNullable<any> {
    // if (value === null) {
    //   return true;
    // }
    return value && (value.isBigNumber || value._isBigNumber);
  }

  public min(min: number | BigNumber, message: string) {
    return this.test({
      message,
      name: 'min',
      exclusive: true,
      params: { min },
      test(value: BigNumber | null) {
        return value === null || value.isGreaterThanOrEqualTo(this.resolve(min));
      },
    });
  }

  public max(max: number | BigNumber, message: string) {
    return this.test({
      message,
      name: 'max',
      exclusive: true,
      params: { max },
      test(value: BigNumber | null) {
        return value === null || value.isLessThanOrEqualTo(this.resolve(max));
      },
    });
  }

  public minDigits(minDigits: number, message: string) {
    return this.test({
      message,
      name: ' minLength',
      exclusive: true,
      params: { minDigits },
      test(value: BigNumber | null) {
        return value === null || value.toFormat().replace(/[.,]/g, '').length >= this.resolve(minDigits);
      },
    });
  }

  public maxDigits(maxDigits: number, message: string) {
    return this.test({
      message,
      name: ' maxLength',
      exclusive: true,
      params: { maxDigits },
      test(value: BigNumber | null) {
        return value === null || value.toFormat().replace(/[.,]/g, '').length <= this.resolve(maxDigits);
      },
    });
  }

  public lessThan(less: number, message: string) {
    return this.test({
      message,
      name: 'lessThan',
      exclusive: true,
      params: { less },
      test(value: BigNumber | null) {
        return value === null || value.isLessThan(this.resolve(less));
      },
    });
  }

  public moreThan(more: number, message: string) {
    return this.test({
      message,
      name: 'moreThan',
      exclusive: true,
      params: { more },
      test(value: BigNumber | null) {
        return value === null || value.isGreaterThan(this.resolve(more));
      },
    });
  }

  public positive(message: string) {
    return this.moreThan(0, message);
  }

  public negative(message: string) {
    return this.lessThan(0, message);
  }

  public required(message: string) {
    return this.test({
      message,
      name: 'required',
      exclusive: true,
      test(value: BigNumber | null) {
        return value !== null;
      },
    });
  }
}
