import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { getQueimadaRoute } from './queimadas-route'

const routes: IRoutes = [{ route: getQueimadaRoute, private: false }]

const queimadaRoute = '/queimadas'

export const queimadaRoutes = registerPrefix(routes, queimadaRoute)
