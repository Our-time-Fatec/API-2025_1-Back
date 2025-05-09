import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(60),
  email: z.string().email(),
  token: z.string(),
  refreshToken: z.string(),
})

export const updateUserSchema = userSchema
  .omit({
    token: true,
    refreshToken: true,
  })
  .extend({ password: z.string().optional() })
  .partial()

export const responseUpdateUserSchema = userSchema
  .omit({
    token: true,
    refreshToken: true,
  })
  .extend({ createdAt: z.date() })

export const loginSchema = userSchema.pick({ email: true }).extend({
  password: z.string().min(6).max(60),
})

export const registerSchema = userSchema
  .omit({
    token: true,
    refreshToken: true,
    id: true,
  })
  .extend({
    password: z.string().min(6).max(60),
  })
