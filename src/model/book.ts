import { prop, mongoose } from '@typegoose/typegoose';

export enum Category {
    COMPUTER = "computer",
    NOVEL = "novel",
    GENERAL = "general",
}

export class Book {
    public _id!: mongoose.Types.ObjectId;

    @prop({ type: String,unique: true})
    public title!: string;

    @prop({ type: String})
    public author!: string;

    @prop({ type: Number})
    public page!: number;

    @prop({ type: String,enum: Category})
    public category!: string;

    @prop({ type: String })
    public summary?: string;

    @prop({ type: Date })
    public createAt!: Date;

}

export interface BookRepo {
    create(title: string,author: string,page:number,category:string,summary:string): Promise<Book>
    find(title: string): Promise<Book|null>
    getList(title: string,author:string,category:string,sort:string,start: string,to:string): Promise<any>
}
