import type { z } from 'zod'
import type { Feature, Stac } from '#/@types/stac/IResponse'
import type { bodySchema as StacBodySchema } from '#/routes/stac/search'

export type StacHttpInterface = z.infer<typeof StacBodySchema>

type Bands = {
  BAND_15: string
  BAND_16: string
}

type DBResponse = {
  id: string
  createdAt: Date | null
  itemId: string
  collection: string
  datetime: Date
  bbox: unknown
  geometry: unknown
  band_15: string
  band_16: string
}

export interface StacModelInterface {
  httpService: (url: string, body: StacHttpInterface) => Promise<Stac>
  getImageUrl: (item: Feature) => string
  getBands: (item: Feature) => Bands
  getFeature: (stac: Stac) => Feature
  imageDownload: (imageUrl: string, localPath: string) => Promise<string>
  saveImage: (
    item: Feature,
    band_15: string,
    band_16: string
  ) => Promise<DBResponse>
}
