import { Request, Response, NextFunction } from 'express'
import { getLogger } from '../../libs/logger'
import { LOG_CATEGORY } from '../../libs/logger/constants'

const accessLogger = getLogger(LOG_CATEGORY.ACCESS)

export const accessLoggingHandler = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (response.headersSent) {
    writeAccessLog(request, response)
  } else {
    response.on('finish', () => {
      writeAccessLog(request, response)
    })
  }
  next()
}

const writeAccessLog = (request: Request, response: Response) => {
  const message = '{} {} {} {}'
  const requestInformation = {
    headers: request.headers,
    query: request.query,
    body: request.body,
  }
  const { statusCode } = response
  if (/[45][\d]{2}/.test(`${statusCode}`)) {
    accessLogger.error(
      message,
      request.method,
      request.url,
      statusCode,
      JSON.stringify(requestInformation)
    )
  } else {
    accessLogger.info(
      message,
      request.method,
      request.url,
      statusCode,
      JSON.stringify(requestInformation)
    )
  }
}
