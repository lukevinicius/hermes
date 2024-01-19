import Elysia, { t } from 'elysia'
import { unlinkSync } from 'node:fs'
import { SendEmailService } from './send-email.service'

export const sendEmail = new Elysia().post(
  '/send-email',
  async ({ body, set }) => {
    // Save the files
    const emailTemplatePath = `${process.cwd()}/src/email/email-template-${
      Math.floor(Math.random() * 1000000) + 1
    }.tsx`

    await Bun.write(emailTemplatePath, body.emailTemplate)

    const sendEmailService = new SendEmailService()

    await sendEmailService.execute({
      from: body.from,
      to: body.to,
      subject: body.subject,
      emailTemplatePath,
    })

    // unlink the files
    unlinkSync(emailTemplatePath)

    set.status = 200
    return {
      message: 'Email sent successfully',
    }
  },
  {
    body: t.Object({
      from: t.String(),
      to: t.String(),
      subject: t.String(),
      emailTemplate: t.String(),
    }),
  },
)
