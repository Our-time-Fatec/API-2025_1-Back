import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { uploadRoute } from './upload'
import { uploadV2Route } from './upload-v2'

const routes: IRoutes = [
  { route: uploadRoute, private: true },
  { route: uploadV2Route, private: true },
]

const uploadPrefix = '/upload'

export const uploadRoutes = registerPrefix(routes, uploadPrefix)
