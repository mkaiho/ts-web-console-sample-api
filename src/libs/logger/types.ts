import { LOG_LEVEL, LOG_CATEGORY } from './constants'

export type LogLevel = typeof LOG_LEVEL[keyof typeof LOG_LEVEL]
export const isTypeOfLogLevel = (arg: unknown): arg is LogLevel => {
  return Object.values(LOG_LEVEL).includes(arg as LogLevel)
}

export type LogCategory = typeof LOG_CATEGORY[keyof typeof LOG_CATEGORY]
export const isTypeOfLogCategory = (arg: LogCategory): arg is LogCategory => {
  return Object.values(LOG_CATEGORY).includes(arg as LogCategory)
}

export type LoggerConifuration = unknown

export interface Logger {
  debug(message: string, ...args: unknown[]): void
  info(message: string, ...args: unknown[]): void
  warn(message: string, ...args: unknown[]): void
  error(message: string, ...args: unknown[]): void
}

export interface LoggerFactory {
  getConfiguration(level: LogLevel): LoggerConifuration
  getLogger(configuration: LoggerConifuration, category: LogCategory): Logger
}
