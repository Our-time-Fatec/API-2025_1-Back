import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    // CommonJS
    return __dirname
  }

  // ESM
<<<<<<< HEAD
  // @ts-ignore
=======
>>>>>>> ce95f30365dedc1bcb405e2b3f5a52705ee1dd32
  return dirname(fileURLToPath(import.meta.url))
}
