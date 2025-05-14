import { CustomError } from '#/errors/custom/CustomError'

export type Queimada = {
  id: string
  date: Date
  bbox: number[]
}

export type GetQueimadasProps = {
  date?: Date
}

const MOCK_QUEIMADA: Queimada[] = [
  { id: '1', date: new Date('2025-01-01'), bbox: [-46.2, -23.6, -43.9, -21.9] },
]

export class QueimadaController {
  async getQueimadas({ date }: GetQueimadasProps): Promise<Queimada[]> {
    const queimadas = MOCK_QUEIMADA

    if (!date) return queimadas

    const filtered = queimadas.filter(q => q.date.getTime() === date.getTime())

    if (filtered.length === 0) {
      throw new CustomError('Nenhum dado encontrado', 404)
    }

    return filtered
  }
}
