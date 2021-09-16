import { config } from '../../config'
import { Logger } from '../../util/logger'
import * as bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";

export let server: express.Application

let isRunning = false

const init = async function(bookTransport:any): Promise<any> {
    const options = config.swaggerOptions
    const swaggerDoc = swaggerJSDoc(options);
    server = express();
    server.use(bodyParser.json())
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    start(bookTransport);

    return server;
};
const start = async (bookTransport:any) => {
    try {
        setupRoutes(bookTransport)
        await server.listen(config.server.restApi.port, () => {
            console.log(`App listening on the port ${config.server.restApi.port}... `);
        });
        isRunning = true
    } catch (err) {
        console.error(err)
        Logger.Instance.error(err)
        process.exit(1)
    }
}

function setupRoutes(bookTransport:any): void {
    bookTransport.setup(server)
}

export async function SetupRest(bookTransport:any): Promise<any> {
    if (!isRunning) {
        await init(bookTransport)
        isRunning = true
    }
    return server
}

