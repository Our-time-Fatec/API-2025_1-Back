import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { QueimadaController } from '#/controllers/QueimadaController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'

export const queimadaRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/queimadas',
        {
            schema: {
                summary: 'Lista de queimadas registradas',
                tags: ['Queimadas'],
                operationId: 'getQueimadas',
                response: {
                    [StatusCodes.OK]: z.object({
                        queimadas: z.array(
                            z.object({
                                id: z.string(),
                                date: z.date(),
                                bbox: z.array(z.number())
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

            const [error, data] = await catchError(controller.getQueimadas())

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

    app.get(
        '/queimadas/:date',
        {
            schema: {
                summary: 'Lista de queimadas registradas por data',
                tags: ['Queimadas'],
                operationId: 'getQueimadasData',
                params: z.object({
                    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
                        message: 'Invalid date format',
                    }),
                }),
                response: {
                    [StatusCodes.OK]: z.object({
                        queimadas: z.array(
                            z.object({
                                id: z.string(),
                                date: z.date(),
                                bbox: z.array(z.number())
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
            const { date } = request.params as { date: string }

            const [error, data] = await catchError(controller.getQueimadasData(new Date(date)))

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