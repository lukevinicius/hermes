import { Elysia } from 'elysia'

import { massEmailSending } from './mass-email-sending.controller'
import { sendEmail } from './send-email.controller'

export const emailRoutes = new Elysia().use(massEmailSending).use(sendEmail)
