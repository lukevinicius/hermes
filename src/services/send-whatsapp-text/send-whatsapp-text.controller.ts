import Elysia, { t } from 'elysia'
import { SendWhatsappTextService } from './send-whatsapp-text.service'

export const sendWhatsappText = new Elysia().post(
  '/send-whatsapp-text',
  async ({ body, set }) => {
    const sendWhatsappTextService = new SendWhatsappTextService()

    await sendWhatsappTextService.execute({
      token: body.token,
      deviceToken: body.deviceToken,
      number: body.number,
      text: body.text,
    })

    set.status = 200
    return {
      status: 'WhatsApp text sent successfully',
    }
  },
  {
    body: t.Object({
      token: t.String(),
      deviceToken: t.String(),
      number: t.String(),
      text: t.String(),
    }),
  },
)
