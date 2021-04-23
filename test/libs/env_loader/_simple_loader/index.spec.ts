import envLoader from '../../../../src/libs/env_loader/_simple_loader'

const OLD_ENV = process.env

beforeEach(() => {
  process.env = { ...OLD_ENV }
})

afterEach(() => {
  process.env = OLD_ENV
})

describe('_simple_loader', () => {
  describe('of', () => {
    test('returned value of key from environment variable.', () => {
      const key = 'KEY'
      const expected = 'OK'
      process.env[key] = expected

      const actual = envLoader.of(key)

      expect(actual).toBe(expected)
    })

    test('returned empty if there is no value with key.', () => {
      const key = 'KEY'
      const expected = ''

      const actual = envLoader.of(key)

      expect(actual).toBe(expected)
    })
  })
})
