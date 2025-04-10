import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../settings/env'
import { processImage } from './schemas/processImage'

export const pg = postgres(env.POSTGRES_URL, {})
export const db = drizzle(pg, {
  schema: {
    processImage,
  },
})
