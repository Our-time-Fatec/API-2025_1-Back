import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { createCicatrizRoute } from './create-cicatriz-route'
import { finalizeCicatrizRoute } from './finalize-cicatriz-route'
import { searchQueimadaBboxRoute } from './search-bbox-route'
import { statusCicatrizRoute } from './status-route'

const routes: IRoutes = [
  { route: searchQueimadaBboxRoute, private: true },
  { route: statusCicatrizRoute, private: true },
  { route: createCicatrizRoute, private: true },
  { route: finalizeCicatrizRoute, private: true },
]

const cicatrizRoute = '/cicatriz'

export const cicatrizRoutes = registerPrefix(routes, cicatrizRoute)
