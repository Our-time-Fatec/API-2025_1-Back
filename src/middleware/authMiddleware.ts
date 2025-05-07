import type { FastifyReply, FastifyRequest } from 'fastify'
import { Auth } from '#/controllers/AuthController'

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return reply.status(401).send({ message: 'Token mal formatado' })
  }

  try {
    const authInstance = new Auth()
    const decoded = authInstance.verifyToken(token)

    if (request.method === 'GET') {
      request.query = {
        ...(typeof request.query === 'object' ? request.query : {}),
        id: decoded.id,
      }
    } else {
      request.body = {
        ...(typeof request.body === 'object' ? request.body : {}),
        id: decoded.id,
      }
    }
  } catch (err) {
    return reply.status(403).send({ message: 'Token inválido ou expirado' })
  }
}

export { authMiddleware }
