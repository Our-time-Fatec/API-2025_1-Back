import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { CicatrizController } from '#/controllers/CicatrizController'
import { UploadController } from '#/controllers/UploadController'
import { StatusCodes } from '#/enums/status-code'
import { IAModel } from '#/model/IAModel'
import { StacModel } from '#/model/StacModel'
import { logger } from '#/settings/logger'
import { catchError } from '#/utils/catchError'
import { allCicatrizSchema } from './schema/schemas'

const querySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
})

export const searchAllCicatrizRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/all',
    {
      schema: {
        querystring: querySchema,
        summary: 'Pesquisar todas as imagens de cicatriz',
        tags: ['Cicatriz'],
        operationId: 'allCicatriz',
        response: {
          201: allCicatrizSchema,
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { startDate, endDate, limit, offset } = request.query

      const iaModel = new IAModel(app.db)
      const stacModel = new StacModel(app.db)
      const uploadController = new UploadController(app.db)

      const cicatrizController = new CicatrizController({
        iaModel,
        uploadController,
        stacModel,
        db: app.db,
      })

      const [error, data] = await catchError(
        cicatrizController.getAllCicatriz({
          startDate,
          endDate,
          limit,
          offset,
        })
      )

      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message,
        })
      }

      return reply.status(StatusCodes.OK).send(data)
    }
  )
}
