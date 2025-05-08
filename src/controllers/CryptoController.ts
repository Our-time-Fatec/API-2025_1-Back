import bcrypt from 'bcryptjs'

class CryptoController {
  private saltRounds: number

  constructor() {
    this.saltRounds = 7
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  private async verifyPasswordMatch(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async verifyPassword(password: string, hash: string): Promise<void> {
    const isValidPassword = await this.verifyPasswordMatch(password, hash)

    if (!isValidPassword) {
      throw new Error('Senha inválida')
    }
  }
}

export { CryptoController }
