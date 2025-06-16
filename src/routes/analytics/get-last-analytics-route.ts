import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { AnalyticsController } from '#/controllers/AnalyticsController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'
import { LastAnalyticsSchemaResponse } from './schemas'

export const getLastAnalyticsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/last',
    {
      schema: {
        summary: 'Busca os dados das últimas 5 analytics',
        tags: ['Analytics'],
        operationId: 'getLastAnalytics',
        response: {
          200: z.array(LastAnalyticsSchemaResponse),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const analyticsController = new AnalyticsController()

      const [error, data] = await catchError(
        analyticsController.getAllLatestAnalytics()
      )

      if (error) {
        return reply.status(error.statusCode).send({ message: error.message })
      }

      return reply.status(StatusCodes.OK).send(data)
    }
  )
}
