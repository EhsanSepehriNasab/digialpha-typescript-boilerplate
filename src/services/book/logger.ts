import { Logger } from '../../util/logger'
import { BookService } from './service'
import { createRequest, createResponse, listRequest,loginRequest,loginResponse } from './endpoint'
import { CErrorHandler } from '../../util/error/error'

class BookServiceLogger implements BookService {
    private bookService: BookService

    constructor(bookService: BookService) {
        this.bookService = bookService
    }

    async create(book: createRequest): Promise<createResponse|CErrorHandler> {
        const startTime = Date.now()
        let result!: createResponse|CErrorHandler
        let err!: Error
        try {
            result = await this.bookService.create(book)
        } catch (error) {
            console.error(error)
        }

        Logger.Instance.info({
            method: 'createSample',
            input: book,
            output: result,
            error: err,
            time: Date.now() - startTime
        })

        if (err != null) {
            throw err
        }
        return result
    }

    async login(login: loginRequest): Promise<loginResponse|CErrorHandler|void> {
        const startTime = Date.now()
        let result!: loginResponse|CErrorHandler|void
        let err!: Error
        try {
            result = await this.bookService.login(login)
        } catch (error) {
            console.error(error)
        }

        Logger.Instance.info({
            method: 'loginSample',
            input: login,
            output: result,
            error: err,
            time: Date.now() - startTime
        })

        if (err != null) {
            throw err
        }
        return result
    }

    async getList(body: listRequest): Promise<any> {
        const startTime = Date.now()
        let result!: any
        let err!: Error
        try {
            result = await this.bookService.getList(body)
        } catch (error) {
            console.error(error)
        }

        Logger.Instance.info({
            method: 'listSample',
            input: body,
            output: result,
            error: err,
            time: Date.now() - startTime
        })

        if (err != null) {
            throw err
        }
        return result
    }
}

export = BookServiceLogger
