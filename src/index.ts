import { Elysia } from 'elysia'
import { routes } from './http/routes'

const app = new Elysia().use(routes)

app.listen(3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
