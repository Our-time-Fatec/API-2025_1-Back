import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UserController } from '#/controllers/UserController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'

export const loginUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        summary: 'Login an user',
        tags: ['User'],
        operationId: 'login',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),

        response: {
          [StatusCodes.OK]: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            token: z.string(),
            refreshToken: z.string(),
          }),
          [StatusCodes.INTERNAL_SERVER_ERROR]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const userController = new UserController()

      const [error, data] = await catchError(
        userController.login({ email, password })
      )

      if (error) {
        return reply.status(error.statusCode).send({
          message: error.message,
        })
      }

      return reply.status(StatusCodes.OK).send({
        ...data,
      })
    }
  )
}
