import envLoader from '../env_loader'
import { LOG_CATEGORY, LOG_LEVEL } from './constants'
import {
  isTypeOfLogLevel,
  LogCategory,
  LoggerFactory,
  Logger,
  LogLevel,
} from './types'
import { loggerFactory as sl4jsLoggerFactory } from './_log4js'

const loggerFactory: LoggerFactory = sl4jsLoggerFactory

const logLevel: LogLevel = ((): LogLevel => {
  const environmentValue = envLoader.of(envLoader.ENV_KEY.LOGGER.LEVEL)
  return isTypeOfLogLevel(environmentValue) ? environmentValue : LOG_LEVEL.ERROR
})()

const configuration = loggerFactory.getConfiguration(logLevel)

export const getLogger = (category: LogCategory): Logger =>
  loggerFactory.getLogger(configuration, category)

export const logger = getLogger(LOG_CATEGORY.DEFAULT)
