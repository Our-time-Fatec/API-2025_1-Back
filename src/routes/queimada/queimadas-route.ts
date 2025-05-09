import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { QueimadaController } from '#/controllers/QueimadaController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'

export const getQueimadaRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/queimadas',
    {
      schema: {
        summary: 'Lista de queimadas registradas, geral ou por data.',
        tags: ['Queimadas'],
        operationId: 'getQueimadas',
        querystring: z.object({
          date: z.coerce.date().optional(),
        }),
        response: {
          [StatusCodes.OK]: z.object({
            queimadas: z.array(
              z.object({
                id: z.string(),
                date: z.date(),
                bbox: z.array(z.number()),
              })
            ),
          }),
          [StatusCodes.INTERNAL_SERVER_ERROR]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const controller = new QueimadaController()
      const { date } = request.query

      const [error, data] = await catchError(controller.getQueimadas({ date }))

      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message,
        })
      }

      return reply.status(StatusCodes.OK).send({
        queimadas: data,
      })
    }
  )
}
