import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { stacSearchRoute } from './search'

const routes: IRoutes = [{ route: stacSearchRoute, private: true }]

const burnPrefix = '/stac'

export const burnRoutes = registerPrefix(routes, burnPrefix)
