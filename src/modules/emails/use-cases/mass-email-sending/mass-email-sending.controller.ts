import Elysia, { t } from 'elysia'
import { unlinkSync } from 'node:fs'
import { MassEmailSendingService } from './mass-email-sending.service'

export const massEmailSending = new Elysia().post(
  '/mass-email-sending',
  async ({ body, set }) => {
    const emailTemplatePath = `${process.cwd()}/src/email/email-template-${
      Math.floor(Math.random() * 1000000) + 1
    }.tsx`

    await Bun.write(emailTemplatePath, body.emailTemplate)

    const massEmailSendingService = new MassEmailSendingService()

    await massEmailSendingService.execute({
      from: body.from,
      subject: body.subject,
      users: body.users,
      emailTemplatePath,
    })

    // unlink the files
    unlinkSync(emailTemplatePath)

    set.status = 200
    return {
      message: 'Emails sent successfully',
    }
  },
  {
    body: t.Object({
      from: t.String(),
      subject: t.String(),
      users: t.Array(
        t.Object({
          name: t.String(),
          email: t.String(),
        }),
      ),
      emailTemplate: t.String(),
    }),
  },
)
