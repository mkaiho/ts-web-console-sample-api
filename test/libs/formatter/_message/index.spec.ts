import { messageFormatterModule } from '../../../../src/libs/formatter/_message'
import { LOG_CATEGORY, LOG_LEVEL } from '../../../../src/libs/logger/constants'

describe('formatter', () => {
  describe('_message', () => {
    describe('format', () => {
      test('returned message passed if only template is passed.', () => {
        const expected = 'TEST'

        const actual = messageFormatterModule.format(expected)
        expect(actual).toBe(expected)
      })
      test("returned message replaced '{}' to passed args if template and args is passed.", () => {
        const template = '{}DEF{}{}'
        const args = ['ABC', 'GHI', 'JKL']
        const expected = 'ABCDEFGHIJKL'

        const actual = messageFormatterModule.format(template, ...args)
        expect(actual).toBe(expected)
      })
    })
  })
})
