import { FastifyInstance, FastifyRequest } from "fastify";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { db } from "../../drizzle/client";
import { stacImages } from '../../drizzle/schemas/metadata';
import { z } from 'zod';

const bodySchema = z.object({
  collections: z.array(z.string()),
  bbox: z.array(z.number()).length(4),
  datetime: z.string(),
});

export async function stacRoutes(app: FastifyInstance) {
  app.post(
    '/stac/search',
    {
      schema: {
        body: bodySchema
      }
    },
    async (request: FastifyRequest<{ Body: z.infer<typeof bodySchema> }>, reply) => {

      try {
        const stacUrl = 'https://data.inpe.br/bdc/stac/v1/search';
        const { collections, bbox, datetime } = request.body;

        const response = await fetch(stacUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collections,
            bbox,
            datetime,
            limit: 10
          })
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Erro STAC:', response.status, text);
          return reply.code(response.status).send({ message: 'Erro na requisição STAC', detalhe: text });
        }

        const raw = await response.text();
        console.log('Resposta bruta do STAC:', raw);
        const data = JSON.parse(raw);
        const features = data.features;

        if (!features || features.length === 0) {
          console.log("Nenhum dado encontrado. Contexto:", data.context);
          return reply.code(404).send({ message: 'Nenhuma imagem encontrada para os critérios especificados.' });
        }

        const item = features[0];
        const assets = item.assets;
        const availableAssets = Object.keys(assets);
        console.log('Assets disponíveis:', availableAssets);

        let imageUrl = assets.thumbnail?.href || assets.visual?.href;
        if (!imageUrl) {
          return reply.code(404).send({ message: 'Nenhuma imagem com asset visual ou thumbnail disponível.' });
        }

        imageUrl = imageUrl.replace(/^\/vsicurl\//, '');
        console.log('Baixando imagem de:', imageUrl);

        const fileName = path.basename(imageUrl);
        const imagesDir = path.join(__dirname, '..', '..', 'images');

        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir);
        }

        const localPath = path.join(imagesDir, fileName);
        const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(localPath);

        await new Promise<void>((resolve, reject) => {
          imageResponse.data.pipe(writer);
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        // Salva no banco
        await db.insert(stacImages).values({
          itemId: item.id,
          collection: item.collection,
          datetime: new Date(item.properties.datetime),
          bbox: item.bbox,
          geometry: item.geometry,
          imageUrl,
          localPath
        });

        return reply.send({
          message: 'Imagem baixada e salva com sucesso.',
          imagePath: localPath
        });

      } catch (error) {
        console.error(error);
        return reply.code(500).send({ message: "Erro ao buscar ou salvar imagem." });
      }
    }
  );
} 