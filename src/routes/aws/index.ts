import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { uploadRoute } from './upload'

const routes: IRoutes = [{ route: uploadRoute, private: true }]

const uploadPrefix = '/upload'

export const uploadRoutes = registerPrefix(routes, uploadPrefix)
