import { and, desc, eq, gte, lte, or, sql } from 'drizzle-orm'
import type {
  CreateCicatrizProps,
  FinalizeCicatrizProps,
  GetAllCicatrizProps,
  GetCicatrizByBboxProps,
  GetCicatrizByIdProps,
  GetStatusCicatrizProps,
} from '#/@types/controller/ICicatriz'
import { STAC_URL } from '#/constants/STAC_URL'
import { db } from '#/drizzle/client'
import { stacImages } from '#/drizzle/schemas/metadata'
import { scarImage } from '#/drizzle/schemas/scar'
import { uploads } from '#/drizzle/schemas/uploads'
import { CustomError } from '#/errors/custom/CustomError'
import { iaModel } from '#/model/IAModel'
import { stacModel } from '#/model/StacModel'
import { catchError } from '#/utils/catchError'
import { retryWithCatch } from '#/utils/retry'
import { uploadController } from './UploadController'

export class CicatrizController {
  async createCicatriz({
    bbox,
    collections,
    datetime,
    limit,
    JWT,
  }: CreateCicatrizProps) {
    const [error, data] = await retryWithCatch(() =>
      stacModel.httpService(STAC_URL, {
        collections,
        bbox,
        datetime,
        limit,
      })
    )

    if (error) {
      throw new CustomError(
        `Erro ao buscar dados STAC. Erro: ${error.message}`,
        error.statusCode,
        'STAC_FETCH_ERROR'
      )
    }

    const [iaError, _] = await catchError(iaModel.checkAIStatus())

    if (iaError) {
      throw new CustomError(iaError.message, iaError.statusCode, iaError.code)
    }

    const feature = stacModel.getFeature(data)

    const { BAND_15, BAND_16 } = stacModel.getBands(feature)

    const [dbErr, dbData] = await catchError(
      stacModel.saveImage(feature, BAND_15, BAND_16)
    )

    if (dbErr) {
      throw new CustomError(
        `${dbErr.message}`,
        dbErr.statusCode,
        'SAVE_IMAGE_ERROR'
      )
    }

    const { id } = dbData

    const [processErr, processData] = await catchError(
      iaModel.startProcess({
        id,
        band15_url: BAND_15,
        band16_url: BAND_16,
        bbox: feature.bbox,
        JWT,
      })
    )

    if (processErr) {
      throw new CustomError(
        `Erro ao iniciar o processo. ${processErr.message}`,
        processErr.statusCode,
        processErr.code
      )
    }

    return processData
  }

  async finalizeCicatriz({ data, jobId, status }: FinalizeCicatrizProps) {
    const [not_found, found] = await catchError(
      db.select().from(scarImage).where(eq(scarImage.jobId, jobId))
    )

    if (not_found) {
      throw new CustomError(
        `Erro ao buscar o processo. Erro: ${not_found.message}`,
        not_found.statusCode,
        'PROCESS_NOT_FOUND'
      )
    }

    if (found.length === 0) {
      throw new CustomError('Processo não encontrado', 404, 'PROCESS_NOT_FOUND')
    }

    const [uploadError, uploadResponse] = await retryWithCatch(() =>
      uploadController.processUpload(data)
    )

    if (uploadError) {
      throw new CustomError(
        `Erro ao fazer upload do arquivo. Erro: ${uploadError.message}`,
        uploadError.statusCode,
        'UPLOAD_ERROR'
      )
    }

    const { id: uploadId } = uploadResponse

    const [processError] = await catchError(
      iaModel.finalizeProcess({ jobId, status, uploadId })
    )

    if (processError) {
      throw new CustomError(
        `Erro ao finalizar o processo. Erro: ${processError.message}`,
        processError.statusCode,
        'PROCESS_FINALIZE_ERROR'
      )
    }
  }

  async getStatusCicatriz({ jobId }: GetStatusCicatrizProps) {
    const [error, data] = await catchError(
      db
        .select({ status: scarImage.status, jobId: scarImage.jobId })
        .from(scarImage)
        .where(eq(scarImage.jobId, jobId))
        .limit(1)
    )

    if (error) {
      throw new CustomError(
        `Erro ao buscar o status do processo. Erro: ${error.message}`,
        503,
        'PROCESS_STATUS_ERROR'
      )
    }

    if (data.length === 0) {
      throw new CustomError('Processo não encontrado', 404, 'PROCESS_NOT_FOUND')
    }

    return data[0]
  }

  async getAllCicatriz({
    offset,
    limit = 10,
    endDate,
    startDate,
  }: GetAllCicatrizProps) {
    const conditions = []

    const query = db
      .select({
        id: scarImage.id,
        jobId: scarImage.jobId,
        stacId: stacImages.id,
        uploadId: uploads.id,
        createdAt: stacImages.createdAt,
        status: scarImage.status,
        url: uploads.url,
      })
      .from(scarImage)
      .leftJoin(stacImages, eq(scarImage.stacId, stacImages.id))
      .leftJoin(uploads, eq(scarImage.uploadId, uploads.id))
      .orderBy(desc(scarImage.createdAt))

    if (offset) {
      query.offset(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    if (startDate) {
      conditions.push(gte(stacImages.startDate, startDate))
    }

    if (endDate) {
      conditions.push(lte(stacImages.endDate, endDate))
    }

    if (conditions.length > 0) {
      query.where(and(...conditions))
    }

    const [error, data] = await catchError(query)

    if (error) {
      throw new CustomError(
        `Erro ao buscar os processos. Erro: ${error.message}`,
        503,
        'PROCESS_FETCH_ERROR'
      )
    }

    return { data, count: data.length }
  }

  async getCicatrizById({ id }: GetCicatrizByIdProps) {
    const query = db
      .select({
        id: scarImage.id,
        jobId: scarImage.jobId,
        stacId: stacImages.id,
        uploadId: uploads.id,
        createdAt: scarImage.createdAt,
        status: scarImage.status,
        url: uploads.url,
        collection: stacImages.collection,
        startDate: stacImages.startDate,
        endDate: stacImages.endDate,
        bbox: stacImages.bbox,
        geometry: stacImages.geometry,
      })
      .from(scarImage)
      .where(and(eq(scarImage.id, id), eq(scarImage.status, 'completed')))
      .leftJoin(stacImages, eq(scarImage.stacId, stacImages.id))
      .leftJoin(uploads, eq(scarImage.uploadId, uploads.id))

    const [error, data] = await catchError(query)

    if (error) {
      throw new CustomError(
        `Erro ao buscar o processo. Erro: ${error.message}`,
        503,
        'PROCESS_FETCH_ERROR'
      )
    }

    return data[0]
  }

  async getCicatrizByBbox({
    bbox,
    limit,
    offset,
    startDate,
    endDate,
  }: GetCicatrizByBboxProps) {
    const [minX, minY, maxX, maxY] = bbox

    const conditions = [
      or(eq(scarImage.status, 'completed'), eq(scarImage.status, 'failed')),
      sql`
      (stac_images.bbox->>0)::float <= ${maxX} AND
      (stac_images.bbox->>2)::float >= ${minX} AND
      (stac_images.bbox->>1)::float <= ${maxY} AND
      (stac_images.bbox->>3)::float >= ${minY}
    `,
    ]

    const query = db
      .select({
        id: scarImage.id,
        jobId: scarImage.jobId,
        stacId: stacImages.id,
        uploadId: uploads.id,
        createdAt: scarImage.createdAt,
        status: scarImage.status,
        url: uploads.url,
        collection: stacImages.collection,
        startDate: stacImages.startDate,
        endDate: stacImages.endDate,
        bbox: stacImages.bbox,
        geometry: stacImages.geometry,
      })
      .from(scarImage)
      .leftJoin(stacImages, eq(scarImage.stacId, stacImages.id))
      .leftJoin(uploads, eq(scarImage.uploadId, uploads.id))
      .orderBy(desc(scarImage.createdAt))

    if (startDate) {
      conditions.push(gte(stacImages.startDate, startDate))
    }

    if (endDate) {
      conditions.push(lte(stacImages.endDate, endDate))
    }

    query.where(and(...conditions))

    if (offset) {
      query.offset(offset)
    }

    if (limit) {
      query.limit(limit)
    }

    const [error, data] = await catchError(query)
    if (error) {
      throw new CustomError(
        `Erro ao buscar os processos. Erro: ${error.message}`,
        503,
        'PROCESS_FETCH_ERROR'
      )
    }

    if (data.length === 0) {
      throw new CustomError('Nenhum processo encontrado', 204, 'NOT_FOUND')
    }

    return { data, count: data.length }
  }
}
