import Elysia, { t } from 'elysia'
import { unlinkSync } from 'node:fs'

import { SendEmailService } from '@/services/send-email/send-email.service'

export const sendEmail = new Elysia().post(
  '/send-email',
  async ({ body }) => {
    // Save the files
    const emailTemplatePath = `${process.cwd()}/src/email/emailTemplate.tsx`
    await Bun.write(emailTemplatePath, body.emailTemplate)

    const sendEmailService = new SendEmailService()

    await sendEmailService.execute({
      from: body.from,
      to: body.to,
      subject: body.subject,
      emailTemplatePath,
    })

    // unlink the files
    await unlinkSync(emailTemplatePath)
  },
  {
    body: t.Object({
      from: t.String(),
      to: t.String(),
      subject: t.String(),
      emailTemplate: t.File({
        required: true,
      }),
    }),
    type: 'multipart/form-data',
  },
)
