import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { IRoutes } from '#/@types/routes/IRoutes'
import { authMiddleware } from '#/middleware/authMiddleware'

export const registerPrefix = (
  routes: IRoutes,
  prefix: string
): FastifyPluginAsyncZod => {
  return async app => {
    for (const { route, private: isPrivate } of routes) {
      app.register(
        async subApp => {
          if (isPrivate) {
            subApp.addHook('preHandler', authMiddleware)
          }
          await route(subApp, {})
        },
        { prefix }
      )
    }
  }
}
