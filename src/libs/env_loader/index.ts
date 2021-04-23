import { EnvLoaderModule, ENV_KEY } from './types'
import envLoaderModule from './_simple_loader'

const envLoader: EnvLoaderModule = envLoaderModule

export default { ENV_KEY, ...envLoader }
