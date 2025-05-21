import z from 'zod'
import { scarStatus } from '#/constants/scar-status'

const geometrySchema = z.object({
  type: z.string(),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
})

export const cicatrizSchema = z.array(
  z.object({
    id: z.string(),
    jobId: z.string(),
    stacId: z.string().nullable(),
    uploadId: z.number().nullable(),
    createdAt: z.date(),
    status: z.enum(scarStatus),
    url: z.string().nullable(),
    collection: z.string().nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    bbox: z.preprocess(val => {
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val)
          return parsed
        } catch {
          return val
        }
      }
      return val
    }, z.array(z.number())),
    geometry: z.unknown().transform(val => {
      return geometrySchema.parse(val)
    }),
  })
)

export const cicatrizBboxResponseSchema = z.object({
  data: cicatrizSchema,
  count: z.number(),
})
