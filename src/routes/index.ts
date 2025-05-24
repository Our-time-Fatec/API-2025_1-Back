import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { analyticsRoutes } from './analytics'
import { uploadRoutes } from './aws'
import { cicatrizRoutes } from './cicatriz'
import { exampleRoutes } from './example'
import { burnRoutes } from './stac'
import { userRoutes } from './user'

export const routes: FastifyPluginAsyncZod[] = []

routes.push(exampleRoutes)
routes.push(uploadRoutes)
routes.push(userRoutes)
routes.push(burnRoutes)
routes.push(cicatrizRoutes)
routes.push(analyticsRoutes)
