import { BookRepo } from '../model/book'
import { BookMongo } from './book-mongo'

export function getBook(): BookRepo {
    return new BookMongo()
}
