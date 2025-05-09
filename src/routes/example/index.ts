import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { helloWorldRoute } from './hello-world'

const routes: IRoutes = [{ route: helloWorldRoute, private: false }]


const exampleRoute = '/api'

export const exampleRoutes = registerPrefix(routes, exampleRoute)
