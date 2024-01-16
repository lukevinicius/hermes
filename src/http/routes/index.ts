import { Elysia } from 'elysia'

import { emailRoutes } from './emails'
import { whatsappRoutes } from './whatsapp.routes'

export const routes = new Elysia()
  .post('/health', async () => {
    return {
      status: 'ok',
    }
  })
  .use(emailRoutes)
  .use(whatsappRoutes)
