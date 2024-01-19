import { resend } from '@/services/resend-client'

interface IRequest {
  from: string
  subject: string
  users: {
    name: string
    email: string
  }[]
  emailTemplatePath: string
}

interface MassEmailSendingBody {
  name: string
  email: string
}

export class MassEmailSendingService {
  async execute({ from, subject, users, emailTemplatePath }: IRequest) {
    // import file from 'file-system'
    const emailTemplate = await import(emailTemplatePath)

    // split the users in 50 emails per array
    const subArrayLength = 50
    const emails = users.reduce((acc, email, index) => {
      const position = Math.floor(index / subArrayLength)

      if (!acc[position]) {
        acc[position] = []
      }

      acc[position].push(email)

      return acc
    }, [] as MassEmailSendingBody[][])

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
