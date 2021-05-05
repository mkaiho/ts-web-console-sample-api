export interface IdModule {
  generate(): string
  isValid(value: unknown): boolean
}
