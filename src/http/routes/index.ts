import { Elysia } from 'elysia'

import { emailRoutes } from './emails'

export const routes = new Elysia()
  .post('/health', async () => {
    return {
      status: 'ok',
    }
  })
  .use(emailRoutes)
