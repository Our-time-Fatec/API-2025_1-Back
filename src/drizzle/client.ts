import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../settings/env'
import { image } from './schemas/image'
import { processImage } from './schemas/processImage'
import { scarImage } from './schemas/scar'
import { uploads } from './schemas/uploads'

export const pg = postgres(env.POSTGRES_URL, {})
export const db = drizzle(pg, {
  schema: {
    processImage,
    uploads,
    image,
    scarImage,
  },
})
