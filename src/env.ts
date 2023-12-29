import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  RESEND_API_KEY: z.string(),
  SENTRY_DSN: z.string(),
})

export const env = envSchema.parse(process.env)
