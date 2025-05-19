import type { ScarStatus } from '#/drizzle/schemas/types/scar-types'

export interface InitProcessProps {
  id: string
  band15_url: string
  band16_url: string
  bbox: number[]
}

export interface InitProcessResponse {
  jobId: string
  status: string
  message: string
}

export interface FinalProcessResponse {
  jobId: string
  status: ScarStatus
  uploadId: number
}

export interface IAModelInterface {
  startProcess: (props: InitProcessProps) => Promise<InitProcessResponse>
  getProcess: (jobId: string) => Promise<InitProcessResponse>
  finalizeProcess: (props: FinalProcessResponse) => Promise<void>
}
