import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { stacSearchRoute } from './search'

const routes: IRoutes = [{ route: stacSearchRoute, private: false }]

const burnPrefix = '/stac'

export const burnRoutes = registerPrefix(routes, burnPrefix)
