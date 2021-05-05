import InvalidValueError from '../../../src/errors/invalid_value_error'
import { idModule } from '../../../src/libs/id'
import Id from '../../../src/models/id/id'

const VALID_ID = '0bc021b2-8f6d-c85c-260a-c8590e0f8cbb'
const INVALID_ID = 'XXXXXXXXXXXXXXXXXXXX'

let mockIdModule: {
  generate: jest.SpyInstance<string, []>
  isValid: jest.SpyInstance<boolean, [value: unknown]>
}

beforeAll(() => {
  mockIdModule = {
    generate: jest.spyOn(idModule, 'generate'),
    isValid: jest.spyOn(idModule, 'isValid'),
  }

  mockIdModule.generate.mockReturnValue(VALID_ID)
  mockIdModule.isValid.mockImplementation((value) => {
    switch (value) {
      case VALID_ID:
        return true
      case INVALID_ID:
        return false
      default:
        fail()
    }
  })
})

afterEach(() => {
  mockIdModule.generate.mockClear()
  mockIdModule.isValid.mockClear()
})

afterAll(() => {
  mockIdModule.generate.mockRestore()
  mockIdModule.isValid.mockRestore()
})

describe('id', () => {
  describe('Id', () => {
    describe('generate', () => {
      test('value of returnd Id is equal to generated by id module', () => {
        const actual = Id.generate()

        expect(actual).toBeInstanceOf(Id)
        expect(mockIdModule.generate).toBeCalledTimes(1)
        expect(actual.value).toBe(mockIdModule.generate.mock.results[0].value)
      })
    })

    describe('validate', () => {
      test('return normally if passed value is valid id', () => {
        const passedIdValue = VALID_ID

        try {
          Id.validate(passedIdValue)

          expect(mockIdModule.isValid).toBeCalledTimes(1)
          expect(mockIdModule.isValid).toBeCalledWith(VALID_ID)
          expect(mockIdModule.isValid).toReturnWith(true)
        } catch (e) {
          fail(`has been thrown error: ${e.message}`)
        }
      })

      test('throw InvalidValueError if passed value is invalid id', () => {
        const passedIdValue = INVALID_ID

        try {
          Id.validate(passedIdValue)
          fail()
        } catch (actual) {
          expect(mockIdModule.isValid).toBeCalledTimes(1)
          expect(mockIdModule.isValid).toBeCalledWith(INVALID_ID)
          expect(mockIdModule.isValid).toReturnWith(false)
          expect(actual).toBeInstanceOf(InvalidValueError)
          expect(actual.message).toBe(`'${INVALID_ID}' is invalid value of id`)
        }
      })
    })

    describe('of', () => {
      test('value of returnd Id is equal to passed if value is valid', () => {
        const passedIdValue = VALID_ID

        try {
          const actual = Id.of(passedIdValue)

          expect(actual).toBeInstanceOf(Id)
          expect(actual.value).toBe(passedIdValue)
        } catch (e) {
          fail(`has been thrown error: ${e.message}`)
        }
      })

      test('throw InvalidValueError if passed value is invalid id', () => {
        const passedIdValue = INVALID_ID

        try {
          Id.of(passedIdValue)
          fail()
        } catch (actual) {
          expect(actual).toBeInstanceOf(InvalidValueError)
          expect(actual.message).toBe(`'${INVALID_ID}' is invalid value of id`)
        }
      })
    })
  })
})
