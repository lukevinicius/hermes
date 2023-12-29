import * as Sentry from '@sentry/bun'
import { Elysia } from 'elysia'
import { ZodError } from 'zod'

import { env } from './env'
import { AppError } from '@/http/errors/AppError'
import { routes } from './http/routes'

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  ignoreErrors: [
    'AppError',
    'AppError',
    'ZodError',
    'VALIDATION',
    'NOT_FOUND',
    'PARSE',
  ],
  enabled: env.NODE_ENV !== 'development',
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

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
        Sentry.captureException(error)
    }
  })
  .use(routes)

app.listen(env.PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
