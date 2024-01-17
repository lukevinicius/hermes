import { Elysia } from 'elysia'

import { massEmailSending } from '@/modules/emails/use-cases/mass-email-sending/mass-email-sending.controller'
import { sendEmail } from '@/modules/emails/use-cases/send-email/send-email.controller'

export const emailRoutes = new Elysia().use(massEmailSending).use(sendEmail)
