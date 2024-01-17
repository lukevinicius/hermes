import { Elysia } from 'elysia'
import { ZodError } from 'zod'

import { env } from './env'

import { AppError } from '@/http/errors/AppError'
import { routes } from './http/routes'

import { sentry } from './services/sentry'

const app = new Elysia()
  .error({
    AppError,
    ZodError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'AppError':
        set.status = error.statusCode
        return {
          message: error.message,
        }
      case 'ZodError':
        set.status = 400

        return {
          message: 'Validation error.',
          issues: error.format(),
        }
      default:
        sentry.captureException(error)
    }
  })
  .use(routes)

app.listen(env.PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
