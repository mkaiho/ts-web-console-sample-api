import { EnvLoaderModule } from '../types'

const envLoaderModule: EnvLoaderModule = {
  of: (key: string) => process.env[key] || '',
}

export default envLoaderModule
