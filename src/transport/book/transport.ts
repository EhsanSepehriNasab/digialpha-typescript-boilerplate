import * as bookEndpoints from '../../services/book/endpoint'

import { BookService } from '../../services/book'

import * as transportUtil from '../../util/transportation'
import * as status from 'http-status-codes'
import * as restUtil from '../../util/rest'
import  verifyAuth from '../middleware/auth'

class BookTransport {
    private service: BookService
    constructor(service: BookService) {
        this.service = service
    }

    setup = (server: any) => {
        /**
            * @swagger
            * 
            * /book:
            *   post:
            *     summary: Adds a new book
            *     requestBody:
            *       content:
            *         application/json:
            *           schema:  
            *             type: object
            *             properties:
            *               title:
            *                 type: string
            *               author:
            *                 type: string
            *               category:
            *                 type: string
            *               page:
            *                 type: number
            *               summary:
            *                 type: string
            *             example:
            *               title: C programing v2
            *               author: Jafar
            *               page: 600
            *               category: computer
            *               summary : hello im jafar
            *     responses:
            *       '200':
            *         description: OK
        */
        server.post('/book', verifyAuth,this.create.bind(this))
         /**
             * @swagger
             * 
             * /book/{page}/{size}:
             *   get:
             *     summary: Get list book
             *     parameters:
             *       - in: path
             *         name: page
             *         schema:
             *           type: string
             *         required: true
             *         description: start of items
             *       - in: path
             *         name: size
             *         schema:
             *           type: string
             *         required: true
             *         description: to the items
             *       - in: query
             *         name: title
             *         schema:
             *           type: string
             *         description: to the items
             *       - in: query
             *         name: author
             *         schema:
             *           type: string
             *         description: to the items
             *       - in: query
             *         name: category
             *         schema:
             *           type: string
             *         description: to the items
             *       - in: query
             *         name: sort
             *         schema:
             *           type: string
             *         description: to the items
             *     responses:
             *       '200':
             *         description: OK
         */
         server.get('/book/:page/:size',verifyAuth, this.getList.bind(this))
         /**
            * @swagger
            * 
            * /login:
            *   post:
            *     summary: login
            *     requestBody:
            *       content:
            *         application/json:
            *           schema:  
            *             type: object
            *             properties:
            *               username:
            *                 type: string
            *               password:
            *                 type: string
            *             example:
            *               username: admin
            *               password: admin
            *     responses:
            *       '200':
            *         description: OK
        */
         server.post('/login', this.login.bind(this))
    }

    private async create(request: any, response: any): Promise<void> {
        try {
            const req: bookEndpoints.createRequest = transportUtil.encode(bookEndpoints.createRequest, request.body)
            await transportUtil.validate(req)
            const result = await this.service.create(req)
            response.status(status.OK).send(result)
        } catch (error) {
            restUtil.handleException(error, response)
        }
    }
    private async getList(request: any, response: any): Promise<void> {
        try {
            const requestObj = {...request.params, ...request.query}
            const req: bookEndpoints.listRequest = transportUtil.encode(bookEndpoints.listRequest, requestObj)
            await transportUtil.validate(req)
            const result = await this.service.getList(req)
            response.status(status.OK).send(result)
        } catch (error) {
            restUtil.handleException(error, response)
        }
    }
    private async login(request: any, response: any): Promise<void> {
        try {
            const req: bookEndpoints.loginRequest = transportUtil.encode(bookEndpoints.loginRequest, request.body)
            await transportUtil.validate(req)
            const result = await this.service.login(req)
            response.status(status.OK).send(result)
        } catch (error) {
            restUtil.handleException(error, response)
        }
    }
}

export = BookTransport
