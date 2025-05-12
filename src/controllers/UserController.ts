import * as SQL from 'drizzle-orm'
import { db } from '#/drizzle/client'
import { users } from '#/drizzle/schemas/user'
import { CustomError } from '#/errors/custom/CustomError'
import { catchError } from '#/utils/catchError'
import { AuthController } from './AuthController'
import { CryptoController } from './CryptoController'

interface LoginProps {
  email: string
  password: string
}

interface RegisterProps {
  name: string
  email: string
  password: string
}

interface UpdateUser {
  id?: number
  name?: string
  email?: string
  password?: string
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

    const [error, data] = await catchError(
      cryptoInstance.verifyPassword(password, user.password)
    )

    if (error) {
      throw new CustomError(
        'Erro ao verificar senha',
        500,
        'ERROR_VERIFY_PASSWORD'
      )
    }

    if (!data) {
      throw new CustomError('Senha inválida', 401, 'INVALID_PASSWORD')
    }

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

  public async register({ name, email, password }: RegisterProps) {
    const cryptoInstance = new CryptoController()
    const authInstance = new AuthController()

    const hashedPassword = await cryptoInstance.hashPassword(password)

    const result = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning()

    const token = authInstance.generateToken(result[0].id, result[0].email)
    const refreshToken = authInstance.generateRefreshToken(
      result[0].id,
      result[0].email
    )

    return {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      token,
      refreshToken,
    }
  }

  public async updateUser({ id, name, email, password }: UpdateUser) {
    const cryptoInstance = new CryptoController()

    if (!id) {
      throw new CustomError(
        'ID do usuário não informado',
        400,
        'BAD_REQUEST_ID_USER'
      )
    }

    const user = await db.select().from(users).where(SQL.eq(users.id, id))

    if (user.length === 0) {
      throw new CustomError('Usuário não encontrado', 404, 'NOT_FOUND_USER')
    }

    const hashedPassword = password
      ? await cryptoInstance.hashPassword(password)
      : user[0].password

    const result = await db
      .update(users)
      .set({
        name: name || user[0].name,
        email: email || user[0].email,
        password: hashedPassword,
      })
      .where(SQL.eq(users.id, id))
      .returning()

    return {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      createdAt: result[0].createdAt,
    }
  }
}
