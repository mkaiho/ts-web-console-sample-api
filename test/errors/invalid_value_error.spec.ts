import AbstractError from '../../src/errors/abstract_error'
import InvalidValueError from '../../src/errors/invalid_value_error'

jest.mock('../../src/errors/abstract_error')

let mockAbstractError: jest.MockInstance<never, never[]>

beforeAll(() => {
  mockAbstractError = (AbstractError as unknown) as typeof mockAbstractError
})

afterAll(() => {
  mockAbstractError.mockRestore()
})

describe('InvalidValueError', () => {
  describe('constructor', () => {
    test('make error message from parameters and passed to super class constructor', () => {
      const passed = {
        name: 'testName',
        value: 'testValue',
      }

      const expecedMessage = "'testValue' is invalid value of testName"

      new InvalidValueError(passed.name, passed.value)

      expect(mockAbstractError).toHaveBeenCalled()
      expect(mockAbstractError).toBeCalledWith(expecedMessage)
    })
  })
})
