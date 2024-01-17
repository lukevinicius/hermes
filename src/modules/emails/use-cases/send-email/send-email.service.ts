import { resend } from '@/services/resend-client'

interface IRequest {
  from: string
  to: string
  subject: string
  emailTemplatePath: string
}

export class SendEmailService {
  async execute({ from, to, subject, emailTemplatePath }: IRequest) {
    // import file from 'file-system'
    const emailTemplate = await import(emailTemplatePath)

    // send the email
    await resend.emails.send({
      from,
      to,
      subject,
      react: emailTemplate.default(),
    })
  }
}
