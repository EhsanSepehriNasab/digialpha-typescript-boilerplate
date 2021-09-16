import * as path from 'path'
import * as env from '../util/environment'

const environment = env.str('NODE_ENV', 'development')
const debugStatus = env.bool('DEBUG', true)
const debugPrefix = `book-service-${environment} `

if (debugPrefix) {
    process.env.DEBUG = debugPrefix
}

export const config = {
    environment,
    appName: 'book-service',
    debug: {
        enabled: debugStatus,
        prefix: debugPrefix
    },
    logger: {
        level: env.str('LOG_LEVEL', 'silly')
    },
    rootDir: path.resolve(''),
    mongoDB: {
        host: env.str('MONGO_HOST', '0.0.0.0'),
        port: env.str('MONGO_PORT', '27017'),
        dbName:
            env.str('MONGO_DB', 'mBook'),
        user: env.str('MONGO_USER', 'root'),
        pass: env.str('MONGO_PASS', '1234'),
    },
    server: {
        restApi: {
            host: env.str('REST_HOST', '0.0.0.0'),
            port: env.num('REST_PORT', 3000),
            logger: env.bool('REST_LOGGER', true)
        }
    },
    swaggerOptions: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Swagger Endpoints Book service',
                version: '1.0.0',
            },
        },
        apis: ["**/*.ts"],
    },
    setting: {}
}
