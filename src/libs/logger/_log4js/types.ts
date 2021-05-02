import { Configuration } from 'log4js'
import { APPENDAR_NAME } from './constants'

export type LoggerConifuration = Configuration

export type AppendarName = typeof APPENDAR_NAME[keyof typeof APPENDAR_NAME]
export const isTypeOfAppendarName = (arg: unknown): arg is AppendarName => {
  return Object.values(APPENDAR_NAME).includes(arg as AppendarName)
}
