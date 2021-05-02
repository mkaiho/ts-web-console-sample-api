import { loggerFactory } from '../../../../src/libs/logger/_log4js'
import { LOG_CATEGORY, LOG_LEVEL } from '../../../../src/libs/logger/constants'
import path from 'path'
import fs from 'fs'

const LOG_FILE_PATH = path.resolve(__dirname, '../../../../logs', 'app.log')
const getDefaultConfiguration = () => ({
  appenders: {
    app_stdout: { type: 'stdout' },
    app_file: { type: 'dateFile', filename: 'logs/app.log' },
    access_stdout: { type: 'stdout' },
    access_file: { type: 'dateFile', filename: 'logs/access.log' },
  },
  categories: {
    default: {
      appenders: ['app_stdout', 'app_file'],
      level: 'debug',
    },
    access: {
      appenders: ['access_stdout', 'access_file'],
      level: 'debug',
    },
  },
})

let configuration = getDefaultConfiguration()

const removeLogFiles = (): void => {
  fs.rmSync(LOG_FILE_PATH, { force: true })
}

const existsFile = (filepath: string): boolean => {
  return fs.existsSync(filepath)
}

const matchTextsInFile = (filepath: string, texts: Array<string>): boolean => {
  if (!existsFile(filepath)) {
    return false
  }

  const lines = fs.readFileSync(filepath).toString().split('\n')

  return texts.every((text) => {
    return lines.some((line) => new RegExp(`${text}`).test(line))
  })
}

beforeEach(() => {
  configuration = getDefaultConfiguration()
  removeLogFiles()
})

afterEach(() => {
  removeLogFiles()
})

describe('logger', () => {
  describe('_log4js', () => {
    describe('getConfiguration', () => {
      test('returned logger configuration.', () => {
        const expectedLevel = LOG_LEVEL.DEBUG
        const expectedConfiguration = configuration
        expectedConfiguration.categories.default.level = expectedLevel

        const actual = loggerFactory.getConfiguration(expectedLevel)

        expect(actual).toEqual(expectedConfiguration)
      })
    })
    describe('getLogger', () => {
      test('returned logger.', () => {
        configuration.categories.default.level = LOG_LEVEL.DEBUG
        const actual = loggerFactory.getLogger(
          configuration,
          LOG_CATEGORY.DEFAULT
        )

        expect(actual).toBeTruthy
      })

      describe('log level', () => {
        const allTexts = ['DEBUG', 'INFO', 'WARN', 'ERROR']
        const params = [
          {
            methodName: 'debug',
            logLevel: LOG_LEVEL.DEBUG,
            excludeTexts: [] as Array<string>,
          },
          {
            methodName: 'info',
            logLevel: LOG_LEVEL.INFO,
            excludeTexts: ['DEBUG'],
          },
          {
            methodName: 'warn',
            logLevel: LOG_LEVEL.WARN,
            excludeTexts: ['DEBUG', 'INFO'],
          },
          {
            methodName: 'error',
            logLevel: LOG_LEVEL.ERROR,
            excludeTexts: ['DEBUG', 'INFO', 'WARN'],
          },
        ]
        params.forEach((param) => {
          test(`logger output when log level is ${param.logLevel}`, () => {
            const expectedMatchTexts = allTexts.filter(
              (text) => !param.excludeTexts.includes(text)
            )
            configuration.categories.default.level = param.logLevel
            configuration.appenders.app_file.type = 'fileSync'

            const sut = loggerFactory.getLogger(
              configuration,
              LOG_CATEGORY.DEFAULT
            )
            sut.debug('logger {}', 'TEST')
            sut.info('logger {}', 'TEST')
            sut.warn('logger {}', 'TEST')
            sut.error('logger {}', 'TEST')

            expect(existsFile(LOG_FILE_PATH)).toBeTruthy()
            expect(
              matchTextsInFile(LOG_FILE_PATH, expectedMatchTexts)
            ).toBeTruthy()
            param.excludeTexts.forEach((text) => {
              expect(matchTextsInFile(LOG_FILE_PATH, [text])).toBeFalsy()
            })
          })
        })
      })
    })
  })
})
