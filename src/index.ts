import { Elysia } from 'elysia'
import { routes } from './http/routes'
import { env } from './env'

const app = new Elysia().use(routes)

app.listen(env.PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
