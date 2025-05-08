import { registerPrefix } from '#/utils/registerPrefix'
import { uploadRoute } from '../upload'
import { queimadaRoute } from '../queimada/queimada'
import { helloWorldRoute } from './hello-world'

const routes = [helloWorldRoute, uploadRoute, queimadaRoute]

const exampleRoute = '/api'

export const exampleRoutes = registerPrefix(routes, exampleRoute)
