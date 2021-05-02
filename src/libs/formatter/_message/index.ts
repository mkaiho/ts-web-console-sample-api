import { MessageFormatterModule } from './types'

export const messageFormatterModule: MessageFormatterModule = {
  format(template: string, ...args: Array<string>): string {
    return args.reduce((message, arg) => {
      return message.replace('{}', arg)
    }, template)
  },
}
