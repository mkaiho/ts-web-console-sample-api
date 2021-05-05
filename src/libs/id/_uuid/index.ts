import { v4 as uuid, validate } from 'uuid'
import { IdModule } from '../types'

export const uuidModule: IdModule = {
  generate(): string {
    return uuid()
  },
  isValid(value: string): boolean {
    return validate(value)
  },
}
