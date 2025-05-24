import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { analyticsCicatrizRoute } from './analytics-cicatriz-route'
import { createCicatrizRoute } from './create-cicatriz-route'
import { finalizeCicatrizRoute } from './finalize-cicatriz-route'
import { searchAllCicatrizRoute } from './search-all-cicatriz'
import { searchCicatrizByBboxRoute } from './search-bbox-route'
import { searchCicatrizByIdRoute } from './search-id-route'
import { statusCicatrizRoute } from './status-route'
import { testRoute } from './test-route'

const routes: IRoutes = [
  { route: searchCicatrizByBboxRoute, private: true },
  { route: statusCicatrizRoute, private: true },
  { route: createCicatrizRoute, private: true },
  { route: finalizeCicatrizRoute, private: true },
  { route: searchAllCicatrizRoute, private: true },
  { route: searchCicatrizByIdRoute, private: true },
  { route: analyticsCicatrizRoute, private: true },
  { route: testRoute, private: false },
]

const cicatrizRoute = '/cicatriz'

export const cicatrizRoutes = registerPrefix(routes, cicatrizRoute)
