export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message

    this.statusCode = statusCode
  }
}
