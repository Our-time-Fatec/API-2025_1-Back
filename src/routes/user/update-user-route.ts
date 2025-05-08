import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { UserController } from '#/controllers/UserController'
import { StatusCodes } from '#/enums/status-code'
import { catchError } from '#/utils/catchError'
import {
  responseUpdateUserSchema,
  updateUserSchema,
  userSchema,
} from './schema/zod'

export const updateUserRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/edit',
    {
      schema: {
        summary: 'Update an user',
        tags: ['User'],
        operationId: 'updateUser',
        body: updateUserSchema,
        response: {
          [StatusCodes.OK]: responseUpdateUserSchema,
          [StatusCodes.INTERNAL_SERVER_ERROR]: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id, email, password, name } = request.body
      const userController = new UserController()

      const [error, data] = await catchError(
        userController.updateUser({ id, email, password, name })
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
