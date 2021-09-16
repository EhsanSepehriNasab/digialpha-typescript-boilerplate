import { IsString,IsNumber, Length, IsNotEmpty,IsEnum } from 'class-validator'
import {Category} from '../../model/book'

export class createRequest {

    @IsString()
    @Length(2, 15)
    title!: string

    @IsString()
    @IsNotEmpty()
    author!: string

    @IsNumber()
    @IsNotEmpty()
    page!: number

    @IsEnum(Category)
    @IsNotEmpty()
    category!: string

    @IsString()
    summary?: string
}

export class listRequest {
    @IsString()
    title?: string

    @IsString()
    author?: string

    @IsString()
    category?: string

    @IsString()
    sort?: string

    @IsString()
    page!: string

    @IsString()
    size!: string
}

export class loginRequest {
    @IsString()
    username!: string

    @IsString()
    password?: string
}

export class createResponse {
    constructor(public id:string,public title: string,public author: string,public page:number,public category:string,public summary:string,public createdAt:Date) {}
}

export class loginResponse {
    constructor(public token:string) {}
}
