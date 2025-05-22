import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../settings/env'
import { scarImage } from './schemas/scar'
import { stacImages } from './schemas/stac'
import { uploads } from './schemas/uploads'
import { users } from './schemas/user'

export const pg = postgres(env.POSTGRES_URL, {})
export const db = drizzle(pg, {
  schema: {
    users,
    uploads,
    stacImages,
    scarImage,
  },
})
