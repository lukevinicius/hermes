import { Elysia } from 'elysia'

import { massEmailSending } from './mass-email-sending.controller'

export const emailRoutes = new Elysia().use(massEmailSending)
