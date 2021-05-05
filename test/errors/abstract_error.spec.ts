import AbstractError from '../../src/errors/abstract_error'

class DummyClass extends AbstractError {}

describe('AbstractError', () => {
  describe('constructor', () => {
    test('properties is set normally', () => {
      const expectedMessage = 'Error Message'
      const expectedName = DummyClass.name

      const actual = new DummyClass(expectedMessage)

      expect(actual).toBeInstanceOf(Error)
      expect(actual).toBeInstanceOf(AbstractError)
      expect(actual.message).toBe(expectedMessage)
      expect(actual.name).toBe(expectedName)
      expect(actual.stack).toBeTruthy()
    })
  })
})
