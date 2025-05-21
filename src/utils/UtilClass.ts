export class UtilClass {
  separarData(caminho: string) {
    const partes = caminho.split(/\\/, 2)
    return {
      startDate: partes[0] || '',
      endDate: partes[1] || '',
    }
  }
}
