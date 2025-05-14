import fs from 'node:fs'
import path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import axios from 'axios'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import type { Stac } from '#/@types/stac/IResponse'
import { http } from '#/client/http'
import { logger } from '#/settings/logger'
import { catchError } from '#/utils/catchError'
import { getDirname } from '#/utils/path'
import { db } from '../../drizzle/client'
import { stacImages } from '../../drizzle/schemas/metadata'

const bodySchema = z.object({
  collections: z.array(z.string()),
  bbox: z.array(z.number()).length(4),
  datetime: z.string(),
  limit: z.number().optional(),
})

export const stacSearchRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/search',
    {
      schema: {
        body: bodySchema,
        summary: 'Pesquisar imagens STAC',
        tags: ['STAC'],
        operationId: 'stacSearch',
      },
    },
    async (request, reply) => {
      const { collections, bbox, datetime, limit } = request.body
      const stacUrl = 'https://data.inpe.br/bdc/stac/v1/search'

      const [fetchError, data] = await catchError(
        http<Stac>(stacUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collections,
            bbox,
            datetime,
            limit: limit || 10,
          }),
        })
      )

      if (fetchError) {
        logger.error('Erro ao buscar dados STAC:', fetchError)
        return reply.code(500).send({
          message: 'Erro ao buscar dados STAC.',
        })
      }

      logger.success(data)

      const features = data.features

      if (!features || features.length === 0) {
        logger.warn('Nenhum dado encontrado. Contexto:', data.context)
        return reply.code(404).send({
          message: 'Nenhuma imagem encontrada para os critérios especificados.',
        })
      }

      const item = features[0]
      const assets = item.assets
      const availableAssets = Object.keys(assets)
      logger.success('Assets disponíveis:', availableAssets)

      let imageUrl = assets.thumbnail?.href || assets.visual?.href
      if (!imageUrl) {
        return reply.code(404).send({
          message: 'Nenhuma imagem com asset visual ou thumbnail disponível.',
        })
      }

      imageUrl = imageUrl.replace(/^\/vsicurl\//, '')
      logger.info('Baixando imagem de:', imageUrl)

      const fileName = path.basename(imageUrl)
      const __dirname = getDirname()

      const imagesDir = path.join(__dirname, '..', '..', 'images')

      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir)
      }

      const localPath = path.join(imagesDir, fileName)
      const [axiosError, imageResponse] = await catchError(
        axios.get(imageUrl, {
          responseType: 'stream',
        })
      )

      if (axiosError) {
        return reply.code(500).send({
          message: 'Erro ao baixar a imagem.',
        })
      }

      const writer = fs.createWriteStream(localPath)

      const [errorStream] = await catchError(
        new Promise<void>((resolve, reject) => {
          imageResponse.data.pipe(writer)
          writer.on('finish', resolve)
          writer.on('error', reject)
        })
      )

      if (errorStream) {
        logger.error('Erro ao baixar a imagem:', errorStream)
        return reply.code(500).send({
          message: 'Erro ao baixar a imagem.',
        })
      }

      const [dbError] = await catchError(
        db.insert(stacImages).values({
          itemId: item.id,
          collection: item.collection,
          datetime: new Date(item.properties.datetime),
          bbox: item.bbox,
          geometry: item.geometry,
          imageUrl,
          localPath,
        })
      )

      if (dbError) {
        return reply.code(500).send({
          message: 'Erro ao salvar imagem no banco de dados.',
        })
      }

      return reply.send({
        message: 'Imagem baixada e salva com sucesso.',
        imagePath: localPath,
      })
    }
  )
}
