export class CErrorHandler {
    message: string
    code: number
    httpCode: number
    constructor(error: CError) {
        this.message = error.message
        this.code = error.code
        this.httpCode = error.httpCode
    }

    toJSON(): CError {
        return {
            message: this.message,
            code: this.code,
            httpCode: this.httpCode
        }
    }

    stringify(): string {
        return `Error: ${this.message}
        code: ${this.code}
        httpCode: ${this.httpCode}`
    }
}

export type CError = {
    message: string
    code: number
    httpCode: number
}

export type Errors = { [key: string]: CErrorHandler }
