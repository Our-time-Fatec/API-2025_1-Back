import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { uploadRoutes } from './aws'
import { exampleRoutes } from './example'
import { queimadaRoutes } from './queimada'
import { userRoutes } from './user'

export const routes: FastifyPluginAsyncZod[] = []
import { stacRoutes } from './stac/search'

routes.push(exampleRoutes)
routes.push(uploadRoutes)
routes.push(userRoutes)
routes.push(queimadaRoutes)
routes.push(stacRoutes)