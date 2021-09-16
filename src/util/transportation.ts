import * as validator from 'class-validator'
import * as transformer from 'class-transformer'
import errors from './error/errors'
import { ClassType } from 'class-transformer/ClassTransformer'

export function encode<T>(t: ClassType<T>, obj: unknown): T {
    return transformer.plainToClass(t, obj)
}

export async function validate<T>(obj: T): Promise<void> {
    const validateErrors = await validator.validate(obj)
    if (validateErrors.length > 0) {
        throw errors.BAD_REQUEST
    }
}
