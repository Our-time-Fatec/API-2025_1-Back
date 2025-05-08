import { CustomError } from '#/errors/custom/CustomError'
import { array } from 'zod'

type Queimada = {
    id: string,
    data: Date,
    bbox: number[] 
}

const MOCK_QUEIMADA: Queimada[] =[
    { id: '1', data: new Date('2025-01-01'), bbox: [-46.2, -23.6, -43,9, -21.9]}
]

export class QueimadaController {

  async getQueimadas(): Promise<Queimada[]> {
  

    return MOCK_QUEIMADA
  }
}
