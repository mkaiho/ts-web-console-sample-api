import { uuidModule } from '../../../../src/libs/id/_uuid'

describe('id', () => {
  describe('_uuid', () => {
    describe('generate', () => {
      test('', () => {
        const expectedPattern = /^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/

        const actual = uuidModule.generate()

        expect(actual).toMatch(expectedPattern)
      })
    })

    describe('isValid', () => {
      test('return true when passed value match UUID pattern', () => {
        const value = '64d48c88-0788-4a60-92f0-f54dae153e1e'

        const actual = uuidModule.isValid(value)

        expect(actual).toBeTruthy()
      })

      test('return false when passed value not match UUID pattern', () => {
        const value = '64d48c88-0788-4a60-92f0'

        const actual = uuidModule.isValid(value)

        expect(actual).toBeFalsy()
      })
    })
  })
})
