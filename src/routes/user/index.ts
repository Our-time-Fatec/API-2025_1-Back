import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { loginUserRoute } from './login-route'
import { registerUserRoute } from './register-route'
import { updateUserRoute } from './update-user-route'

const routes: IRoutes = [
  { route: loginUserRoute, private: false },
  { route: registerUserRoute, private: false },
  { route: updateUserRoute, private: true },
]

const userRoute = '/users'

export const userRoutes = registerPrefix(routes, userRoute)
