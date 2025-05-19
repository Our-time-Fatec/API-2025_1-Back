import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { stacImages } from './metadata'
import { scarStatusEnum } from './types/scar-types'
import { uploads } from './uploads'

export const scarImage = pgTable('scar_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  stacId: uuid('stac_id')
    .references(() => stacImages.id)
    .notNull(),
  uploadId: integer('upload_id').references(() => uploads.id),
  jobId: text('job_id').notNull(),
  status: scarStatusEnum('status').notNull().default('processing'),
})
