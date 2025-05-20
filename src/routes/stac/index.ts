import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { stacSearchRoute } from './search'
import { stacSearchV2Route } from './search-v2'
import { stacStatusRoute } from './status'

const routes: IRoutes = [
  { route: stacSearchRoute, private: true },
  { route: stacSearchV2Route, private: true },
  { route: stacStatusRoute, private: true },
]

const burnPrefix = '/stac'

export const burnRoutes = registerPrefix(routes, burnPrefix)
