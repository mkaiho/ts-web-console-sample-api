import InvalidValueError from '../../errors/invalid_value_error'
import { idModule } from '../../libs/id'

export default class Id {
  private readonly _value: string

  protected constructor(_value: string) {
    this._value = _value
  }

  get value(): string {
    return this._value
  }

  public static generate(): Id {
    return new this(idModule.generate())
  }

  public static of(value: string): Id {
    this.validate(value)

    return new this(idModule.generate())
  }

  public static validate(value: unknown): void {
    if (!idModule.isValid(value)) {
      throw new InvalidValueError('id', value as string)
    }
  }
}
