import { Elysia } from 'elysia'

import { sendWhatsappText } from '@/modules/whatsapp/use-cases/send-whatsapp-text/send-whatsapp-text.controller'

export const whatsappRoutes = new Elysia().use(sendWhatsappText)
