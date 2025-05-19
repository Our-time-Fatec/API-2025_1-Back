import { pgEnum } from 'drizzle-orm/pg-core'

export const scarStatus = [
  'pending',
  'processing',
  'completed',
  'failed',
] as const

export type ScarStatus = (typeof scarStatus)[number]

export const scarStatusEnum = pgEnum('scar_status', scarStatus)
