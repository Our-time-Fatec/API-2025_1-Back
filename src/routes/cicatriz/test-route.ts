import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { scarStatus } from '#/constants/scar-status'
import { CicatrizController } from '#/controllers/CicatrizController'
import { StatusCodes } from '#/enums/status-code'
import { logger } from '#/settings/logger'
import { catchError } from '#/utils/catchError'
import { NVDIResultSchema } from '../../schemas/iaSchema'

export const testRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/test',
    {
      schema: {
        summary: 'Checa o status do processamento de uma cicatriz',
        body: NVDIResultSchema,
        querystring: z.object({
          jobId: z.string(),
        }),
        tags: ['Cicatriz'],
        operationId: 'test',
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { bbox_real, area_stats, ndvi_stats } = request.body
      const { jobId } = request.query

      logger.info('bbox_real', bbox_real)
      logger.info('area_stats', area_stats)
      logger.info('ndvi_stats', ndvi_stats)
      logger.info('jobId', jobId)

      return reply.status(StatusCodes.OK).send({ message: 'status ok' })
    }
  )
}
