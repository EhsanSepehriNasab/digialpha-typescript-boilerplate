import { Book, BookRepo } from '../model/book'
import { IdGenerator } from '../util/snow-flake'
import * as dbUtils from '../util/db'
import { getModelForClass } from '@typegoose/typegoose';

const bookModel = getModelForClass(Book);

export class BookMongo implements BookRepo {
    async create(title: string,author: string,page:number,category:string,summary:string): Promise<Book> {
        const model = dbUtils.validateNotNullKeys({
            id: IdGenerator.Instance.getID(),
            title: title,
            author: author,
            page:page,
            category: category,
            summary: summary,
            createAt: new Date().valueOf(),
        })
        const book = await bookModel.create(model)
        return book
    }
    async find(title: string): Promise<Book|null> {
        const book = await bookModel.findOne({title:title})
        return book
    }
    async getList(title: string,author:string,category:string,sort:string|null,page: string,size:string): Promise<any> {
        let findObject:any = {
            title:{ "$regex": title, "$options": "i" } , author:{ "$regex": author, "$options": "i" },category:category
        }
        let sortValue:any = sort

        if(!title) delete findObject.title
        if(!author) delete findObject.author
        if(!category) delete findObject.category
        if(!sort) sortValue = '_id'

        return await bookModel.find(findObject).skip(parseInt(page)*10).limit(parseInt(size)).sort([[sortValue,-1]])
    }
}
