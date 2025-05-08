import type { IRoutes } from '#/@types/routes/IRoutes'
import { registerPrefix } from '#/utils/registerPrefix'
import { loginUserRoute } from './login'

const routes: IRoutes = [{ route: loginUserRoute, private: false }]

const userRoute = '/users'

export const userRoutes = registerPrefix(routes, userRoute)
