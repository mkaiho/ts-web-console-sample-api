import log4js from 'log4js'
import { formatter } from '../../formatter'
import { LOG_CATEGORY } from '../constants'
import { LogLevel, Logger, LoggerFactory, LogCategory } from '../types'
import { APPENDAR_NAME } from './constants'
import { LoggerConifuration } from './types'

export { LoggerConifuration } from './types'

export const loggerFactory: LoggerFactory = {
  getConfiguration(logLevel: LogLevel): LoggerConifuration {
    return {
      appenders: {
        [APPENDAR_NAME.APP_STDOUT]: {
          type: 'stdout',
        },
        [APPENDAR_NAME.APP_FILE]: {
          type: 'dateFile',
          filename: 'logs/app.log',
        },
        [APPENDAR_NAME.ACCESS_STDOUT]: {
          type: 'stdout',
        },
        [APPENDAR_NAME.ACCESS_FILE]: {
          type: 'dateFile',
          filename: 'logs/access.log',
        },
      },
      categories: {
        [LOG_CATEGORY.DEFAULT]: {
          appenders: [APPENDAR_NAME.APP_STDOUT, APPENDAR_NAME.APP_FILE],
          level: logLevel,
        },
        [LOG_CATEGORY.ACCESS]: {
          appenders: [APPENDAR_NAME.ACCESS_STDOUT, APPENDAR_NAME.ACCESS_FILE],
          level: logLevel,
        },
      },
    }
  },
  getLogger(
    configuration: LoggerConifuration,
    category: LogCategory = LOG_CATEGORY.DEFAULT
  ): Logger {
    log4js.configure(configuration)
    const logger = log4js.getLogger(category)
    return {
      debug(message: string, ...args: string[]): void {
        logger.debug(formatter.message.format(message, ...args))
      },
      info(message: string, ...args: string[]): void {
        logger.info(formatter.message.format(message, ...args))
      },
      warn(message: string, ...args: string[]): void {
        logger.warn(formatter.message.format(message, ...args))
      },
      error(message: string, ...args: string[]): void {
        logger.error(formatter.message.format(message, ...args))
      },
    }
  },
}
