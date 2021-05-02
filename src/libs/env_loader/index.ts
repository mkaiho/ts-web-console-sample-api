import { ENV_KEY } from './constants'
import { EnvLoaderModule } from './types'
import envLoaderModule from './_simple_loader'

const envLoader: EnvLoaderModule = envLoaderModule

export default { ENV_KEY, ...envLoader }
