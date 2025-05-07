import { env } from '../settings/env'

const portSettings = {
  PORT: env.PORT,
  BASE_URL: `http://localhost:${env.PORT}`,
  WEB_URL: env.WEB_URL,
}

const version = '0.0.5'

export { portSettings, version }
