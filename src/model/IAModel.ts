import { eq } from 'drizzle-orm'
import { http } from '#/client/http'
import { db } from '#/drizzle/client'
import { scarImage } from '#/drizzle/schemas/scar'
import { type ScarStatus, scarStatus } from '#/drizzle/schemas/types/scar-types'
import { CustomError } from '#/errors/custom/CustomError'
import { env } from '#/settings/env'
import { catchError } from '#/utils/catchError'
import { retryWithCatch } from '#/utils/retry'
import type {
  FinalProcessResponse,
  IAModelInterface,
  InitProcessProps,
  InitProcessResponse,
} from './interfaces/IAModel'

export class IAModel implements IAModelInterface {
  async startProcess(props: InitProcessProps): Promise<InitProcessResponse> {
    const { id, band15_url, band16_url, bbox } = props

    const [err, data] = await retryWithCatch(() =>
      http<InitProcessResponse>(`${env.IA_URL}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          band15_url,
          band16_url,
          bbox,
        }),
      })
    )

    const isValidScarStatus = (status: string): status is ScarStatus =>
      scarStatus.includes(status as ScarStatus)

    if (err) {
      throw new CustomError(
        'Erro ao iniciar o processo',
        500,
        'PROCESS_START_ERROR'
      )
    }

    if (!isValidScarStatus(data.status)) {
      throw new CustomError(
        'Status do processo inválido',
        500,
        'INVALID_PROCESS_STATUS'
      )
    }

    const [scarError] = await catchError(
      db
        .insert(scarImage)
        .values({ stacId: id, status: data.status, jobId: data.jobId })
    )

    if (scarError) {
      throw new CustomError(
        'Erro ao salvar o processo',
        500,
        'PROCESS_SAVE_ERROR'
      )
    }

    return data
  }

  async getProcess(jobId: string): Promise<InitProcessResponse> {
    const [err, data] = await catchError(
      http<InitProcessResponse>(`${env.IA_URL}/process/${jobId}`)
    )

    if (err) {
      throw new CustomError(
        'Erro ao conferir o status do processo',
        500,
        'PROCESS_FETCH_ERROR'
      )
    }
    return data
  }

  async finalizeProcess({
    jobId,
    uploadId,
    status,
  }: FinalProcessResponse): Promise<void> {
    const [err] = await retryWithCatch(() =>
      db
        .update(scarImage)
        .set({ uploadId, status })
        .where(eq(scarImage.jobId, jobId))
    )

    if (err) {
      throw new CustomError(
        'Erro ao finalizar o processo',
        500,
        'PROCESS_FINALIZE_ERROR'
      )
    }
  }
}

export const iaModel = new IAModel()
