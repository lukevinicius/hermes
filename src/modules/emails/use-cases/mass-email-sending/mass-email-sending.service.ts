import csv from 'csvtojson'

import { resend } from '@/services/resend-client'

interface IRequest {
  from: string
  subject: string
  csvPath: string
  emailTemplatePath: string
}

interface MassEmailSendingBody {
  name: string
  email: string
}

export class MassEmailSendingService {
  async execute({ from, subject, csvPath, emailTemplatePath }: IRequest) {
    // read the csv file and convert to json
    const jsonFromCsv = await csv({
      delimiter: ';',
    }).fromFile(csvPath)

    // split the json in 50 emails per array
    const emails = jsonFromCsv.reduce((acc, email, index) => {
      const position = Math.floor(index / 50)

      if (!acc[position]) {
        acc[position] = []
      }

      acc[position].push(email)

      return acc
    }, [] as MassEmailSendingBody[])

    // import file from 'file-system'
    const emailTemplate = await import(emailTemplatePath)

    // send the emails
    for (let i = 0; i < 3000; i++) {
      const email = emails[i]

      console.log(`Sending ${i} of ${emails.length} emails`)

      await resend.emails.send({
        from,
        to: email.map((e: { name: string; email: string }) => e.email),
        subject,
        react: emailTemplate.default(),
      })
    }
  }
}
