import AbstractError from './abstract_error'

export default class InvalidValueError extends AbstractError {
  constructor(name: string, value: string) {
    super(`'${value}' is invalid value of ${name}`)
  }
}
