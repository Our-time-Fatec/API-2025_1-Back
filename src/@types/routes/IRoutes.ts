import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

interface RouteSchema {
  route: FastifyPluginAsyncZod
  private: boolean
}

export type IRoutes = RouteSchema[]
