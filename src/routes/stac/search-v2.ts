import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { CicatrizController } from '#/controllers/CicatrizController'
import { StatusCodes } from '#/enums/status-code'
import { logger } from '#/settings/logger'
import { catchError } from '#/utils/catchError'

export const bodySchema = z.object({
  collections: z.array(z.string()),
  bbox: z.array(z.number()).length(4),
  datetime: z.string(),
  limit: z.number().optional(),
})

export const stacSearchV2Route: FastifyPluginAsyncZod = async app => {
  app.post(
    '/search/v2',
    {
      schema: {
        body: bodySchema,
        summary: 'Pesquisar imagens STAC',
        tags: ['STAC'],
        operationId: 'stacSearch',
        response: {
          200: z.object({
            jobId: z.string(),
            status: z.string(),
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const {
        collections,
        bbox,
        datetime,
        limit,
        token: JWT,
      } = request.body as {
        token: string
      } & typeof request.body

      if (!JWT) {
        return reply.status(StatusCodes.UNAUTHORIZED).send({
          message: 'JWT não fornecido',
        })
      }

      const cicatrizController = new CicatrizController()

      const [error, data] = await catchError(
        cicatrizController.createCicatriz({
          collections,
          bbox,
          datetime,
          limit,
          JWT,
        })
      )

      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message,
        })
      }

      return reply.status(StatusCodes.CREATED).send(data)
    }
  )
}
