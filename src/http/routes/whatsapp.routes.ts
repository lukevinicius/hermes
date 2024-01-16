import { sendWhatsappText } from '@/services/send-whatsapp-text/send-whatsapp-text.controller'
import { Elysia } from 'elysia'

export const whatsappRoutes = new Elysia().use(sendWhatsappText)
