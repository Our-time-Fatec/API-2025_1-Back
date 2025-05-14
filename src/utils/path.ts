import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    // CommonJS
    return __dirname
  }

  // ESM
  return dirname(fileURLToPath(import.meta.url))
}
