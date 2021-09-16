import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { config } from '../../config'
import DailyRotateFile from 'winston-daily-rotate-file'
import * as util from 'util'
const { format } = winston

export class Logger {
    private fileTransport: DailyRotateFile
    private logger: winston.Logger

    private static _Instance: Logger

    static get Instance(): Logger {
        if (!Logger._Instance) {
            Logger._Instance = new Logger()
        }
        return Logger._Instance
    }

    static set Instance(logger: Logger) {
        throw new Error('You are not allowed to set logger to static instance.')
    }

    private constructor() {
        this.fileTransport = new winston.transports.DailyRotateFile({
            filename: config.appName + '-%DATE%.log',
            frequency: '1h',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d',
            dirname: './log'
        })

        this.logger = winston.createLogger({
            format: format.combine(format.errors({ stack: true }), format.metadata(), format.json(), format.splat()),
            level: config.logger.level,
            transports: [new winston.transports.Console(), this.fileTransport]
        })
    }

    getLogger(): winston.Logger {
        return this.logger
    }

    error(...message: any[]): void {
        this.log('error', ...message)
    }

    warn(...message: any[]): void {
        this.log('warn', ...message)
    }

    info(...message: any[]): void {
        this.log('info', ...message)
    }

    verbose(...message: any[]): void {
        this.log('verbose', ...message)
    }

    debug(...message: any[]): void {
        if (config.debug.enabled) {
            this.log('debug', ...message)
        }
    }

    silly(...message: any[]): void {
        this.log('silly', ...message)
    }

    private log(logLevel: string, ...message: any[]): void {
        const text = config.debug.prefix
        let log = ''
        for (const msg of message) {
            log += util.inspect(msg, true, null).replace(/\r?\n/g, '')
            log += ' '
        }
        this.logger.log(logLevel, text + log)
    }
}
