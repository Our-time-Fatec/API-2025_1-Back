import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { style } from '#/themes/style'
import { portSettings, version } from './base-config'

export function registerPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: [portSettings.BASE_URL, portSettings.WEB_URL],
  })

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'OurSpace API',
        version: version,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    transform: jsonSchemaTransform,
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    theme: {
      css: [{ filename: 'theme.css', content: style }],
    },
  })

  app.setSerializerCompiler(serializerCompiler)
  app.setValidatorCompiler(validatorCompiler)
}
