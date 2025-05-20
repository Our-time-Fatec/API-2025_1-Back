import type { MultipartFile } from '@fastify/multipart'
import type { StacHttpInterface } from '../models/IStacModel'

export type CreateCicatrizProps = StacHttpInterface & { JWT: string }

export interface FinalizeCicatrizProps {
  data: MultipartFile | undefined
  jobId: string
  status: string
}

export interface GetStatusCicatrizProps {
  jobId: string
}

export interface GetAllCicatrizProps {
  limit?: number
  offset?: number
  startDate?: string
  endDate?: string
}

export interface GetCicatrizByIdProps {
  id: string
}

export interface GetCicatrizByBboxProps {
  bbox: number[]
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}
