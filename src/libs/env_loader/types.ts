export const ENV_KEY = {} as const

export interface EnvLoaderModule {
  of: (key: string) => string
}
