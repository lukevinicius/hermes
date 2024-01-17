import * as Sentry from '@sentry/bun'

import { env } from '@/env'

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

export const sentry = Sentry
