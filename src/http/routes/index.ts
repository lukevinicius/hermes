import { Elysia } from 'elysia'

import { emailRoutes } from './emails'

export const routes = new Elysia().use(emailRoutes)
