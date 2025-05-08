import * as SQL from 'drizzle-orm'
import { db } from '#/drizzle/client'
import { users } from '#/drizzle/schemas/user'
import { CustomError } from '#/errors/custom/CustomError'
import { AuthController } from './AuthController'
import { CryptoController } from './CryptoController'

interface LoginProps {
  email: string
  password: string
}

export class UserController {
  public async login({ email, password }: LoginProps) {
    const cryptoInstance = new CryptoController()
    const authInstance = new AuthController()

    const result = await db
      .select()
      .from(users)
      .where(SQL.eq(users.email, email))

    if (result.length === 0) {
      throw new CustomError('Usuário não encontrado', 404, 'NOT_FOUND_USER')
    }

    const user = result[0]

    await cryptoInstance.verifyPassword(password, user.password)

    if (user.removedAt) {
      const existentUser = await db
        .update(users)
        .set({ removedAt: null })
        .where(SQL.eq(users.id, user.id))
        .returning()

      const token = authInstance.generateToken(
        existentUser[0].id,
        existentUser[0].email
      )
      const refreshToken = authInstance.generateRefreshToken(
        existentUser[0].id,
        existentUser[0].email
      )

      return {
        id: existentUser[0].id,
        name: existentUser[0].name,
        email: existentUser[0].email,
        token,
        refreshToken,
      }
    }

    const token = authInstance.generateToken(user.id, user.email)
    const refreshToken = authInstance.generateRefreshToken(user.id, user.email)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refreshToken,
    }
  }
}
