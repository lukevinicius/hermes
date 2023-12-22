import Elysia, { t } from 'elysia'
import { unlinkSync } from 'node:fs'

import { MassEmailSendingService } from '@/services/mass-email-sending/mass-email-sending.service'

export const massEmailSending = new Elysia().post(
  '/mass-email-sending',
  async ({ body }) => {
    // Create a folder to save the files
    const csvPath = `${process.cwd()}/src/email/emails.csv`
    await Bun.write(csvPath, body.csv)
    const emailTemplatePath = `${process.cwd()}/src/email/emailTemplate.tsx`
    await Bun.write(emailTemplatePath, body.emailTemplate)

    const massEmailSendingService = new MassEmailSendingService()

    await massEmailSendingService.execute({
      from: body.from,
      subject: body.subject,
      csvPath,
      emailTemplatePath,
    })

    // unlink the files
    await unlinkSync(csvPath)
    await unlinkSync(emailTemplatePath)
  },
  {
    body: t.Object({
      from: t.String(),
      subject: t.String(),
      csv: t.File({
        required: true,
        type: 'text/csv',
      }),
      emailTemplate: t.File({
        required: true,
      }),
    }),
    type: 'multipart/form-data',
  },
)
