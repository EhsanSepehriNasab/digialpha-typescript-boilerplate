import { CErrorHandler } from './error/error'
import * as statusCode from 'http-status-codes'
import errors from './error/errors'
import { Logger } from './logger'

export function handleException(error: any, reply: any): void {
    Logger.Instance.error(error)
    if (error instanceof CErrorHandler) {
        reply.status(error.httpCode).send(error.toJSON())
    } else if (error instanceof Error) {
        reply.status(statusCode.INTERNAL_SERVER_ERROR).send({
            error: error.toString(),
            code: statusCode.INTERNAL_SERVER_ERROR
        })
    } else {
        reply.status(statusCode.INTERNAL_SERVER_ERROR).send(error)
    }
}
