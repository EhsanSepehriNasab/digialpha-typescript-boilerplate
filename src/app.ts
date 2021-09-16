import { Logger } from './util/logger'
import { getBook } from './repo/book'

import * as BookService from './services/book'
import BookTransport from './transport/book/transport'
import * as Rest from './transport/rest'
import { connectMongoose } from './model/mongo-connector';

async function main() {
    try {
        connectMongoose.connection();

        const bookRepo = getBook()
        const bookService = BookService.getService(bookRepo)
        const bookTransport = new BookTransport(bookService)

        await Rest.SetupRest(bookTransport)
    } catch (error) {
        Logger.Instance.error(error)
    }
}

main()
