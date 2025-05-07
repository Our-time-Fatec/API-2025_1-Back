import jwt from 'jsonwebtoken'
import type { DecodedToken } from '#/@types/auth/IAuth'
import { env } from '#/settings/env'

export class Auth {
  private JWT_EXPIRES_IN = 24 * 60 * 60
  private REFRESH_EXPIRES_IN = 30 * 24 * 60 * 60
  private JWT_SECRET = env.JWT_SECRET
  private REFRESH_SECRET = env.JWT_REFRESH_SECRET

  public verifyToken(token: string) {
    return jwt.verify(token, this.JWT_SECRET) as DecodedToken
  }

  public verifyRefreshToken(token: string) {
    return jwt.verify(token, this.REFRESH_SECRET) as DecodedToken
  }

  public generateToken(id: string, email: string) {
    return jwt.sign({ id: id, email: email }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    })
  }

  public generateRefreshToken(id: string, email: string) {
    return jwt.sign({ id: id, email: email }, this.REFRESH_SECRET, {
      expiresIn: this.REFRESH_EXPIRES_IN,
    })
  }
}
