export interface MessageFormatterModule {
  format(template: string, ...args: Array<string>): string
}
