import errors from '../../util/error/errors'
import { BookRepo } from '../../model/book'
import * as endpoints from './endpoint'
import BookServiceLogger from './logger'
import { CErrorHandler } from '../../util/error/error'
import {getToken} from '../../util/jwt/index'
export interface BookService {
    create(book: endpoints.createRequest): Promise<endpoints.createResponse | CErrorHandler>
    getList(body: endpoints.listRequest): Promise<Array<endpoints.createResponse> | CErrorHandler>
    login(body: endpoints.loginRequest): Promise<endpoints.loginResponse | CErrorHandler |void>
}

class bookService implements BookService {
    private bookRepo!: BookRepo

    constructor(sampleRepo: BookRepo) {
        this.bookRepo = sampleRepo
    }

    async create(book: endpoints.createRequest): Promise<endpoints.createResponse | CErrorHandler> {
        try {
            const checkExist = await this.bookRepo.find(book.title)
            if (checkExist) return errors.DUPLICATE_ERROR
            const newBook = await this.bookRepo.create(book.title, book.author, book.page, book.category, book.summary ?? "")
            return new endpoints.createResponse(newBook._id.toString(), newBook.title, newBook.author, newBook.page, newBook.category, newBook.summary ?? "", newBook.createAt)
        } catch (error) {
            return errors.UNKNOWN_ERROR
        }
    }

    async getList(body: endpoints.listRequest): Promise<Array<endpoints.createResponse> | CErrorHandler> {
        try {
            const bookList = await this.bookRepo.getList(body.title ?? '', body.author ?? '', body.category ?? '', body.sort ?? '', body.page, body.size)
            return bookList
        } catch (error) {
            return errors.UNKNOWN_ERROR
        }
    }

    async login(body: endpoints.loginRequest): Promise<endpoints.loginResponse | CErrorHandler> {
        try {
            if(body.username == "admin" && body.password == "admin"){ 
                const result = await getToken(body.username,body.password)
                return {token : result}
            }
            else{
                return errors.AUTH_FAILED
            }
        } catch (error) {
            return errors.UNKNOWN_ERROR
        }
    }
}

export function getService(repo: BookRepo): BookService {
    return new BookServiceLogger(new bookService(repo))
}
