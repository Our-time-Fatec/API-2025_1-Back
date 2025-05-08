import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UserController } from '#/controllers/UserController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'
import { registerSchema, userSchema } from './schema/zod'

export const registerUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/register',
    {
      schema: {
        summary: 'Register an user',
        tags: ['User'],
        operationId: 'registerUser',
        body: registerSchema,
        response: {
          [StatusCodes.OK]: userSchema,
          [StatusCodes.INTERNAL_SERVER_ERROR]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password, name } = request.body
      const userController = new UserController()

      const [error, data] = await catchError(
        userController.register({ email, password, name })
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
