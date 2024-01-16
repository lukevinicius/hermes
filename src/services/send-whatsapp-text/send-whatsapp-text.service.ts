import { env } from '@/env'
import { AppError } from '@/http/errors/AppError'
import axios from 'axios'

interface IRequest {
  token: string
  deviceToken: string
  number: string
  text: string
}

export class SendWhatsappTextService {
  async execute({ token, deviceToken, number, text }: IRequest) {
    await axios
      .post(
        `${env.APIBRASIL_ENDPOINT}/api/v2/whatsapp/sendText`,
        {
          number,
          text,
          time_typing: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            DeviceToken: deviceToken,
          },
        },
      )
      .catch((err) => {
        throw new AppError(err.response.data.message, err.response.status)
      })
  }
}
