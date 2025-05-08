import { CustomError } from '#/errors/custom/CustomError'
import { array } from 'zod'

type Queimada = {
    id: string,
    date: Date,
    bbox: number[] 
}

const MOCK_QUEIMADA: Queimada[] =[
    { id: '1', date: new Date('2025-01-01'), bbox: [-46.2, -23.6, -43,9, -21.9]}
]

export class QueimadaController {
  async getQueimadas(): Promise<Queimada[]> {
    return MOCK_QUEIMADA
  }

  async getQueimadasData(date: Date): Promise<Queimada[]> {
    const queimadas = await this.getQueimadas()
    const filtered = queimadas.filter(queimada => queimada.date === date)
    if (filtered.length === 0) {
      throw new CustomError('Nenhum dado encontrado', 404)
    }
    return filtered
  }
}
