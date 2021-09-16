import { CErrorHandler } from './error'

const errors = {
    UNKNOWN_ERROR: new CErrorHandler({
        httpCode: 500,
        code: 1001,
        message: 'Unknown server error.'
    }),
    NOT_FOUND_ERROR: new CErrorHandler({
        httpCode: 404,
        code: 1001,
        message: 'Not found.'
    }),
    DUPLICATE_ERROR: new CErrorHandler({
        httpCode: 400,
        code: 1021,
        message: 'Duplicate book name.'
    }),
    VALIDATION_ERROR: new CErrorHandler({
        httpCode: 422,
        code: 1002,
        message: 'Some fields are not valid or present.'
    }),
    NOT_AUTHORIZED: new CErrorHandler({
        httpCode: 401,
        code: 1003,
        message: 'You do not have access to this route.'
    }),
    INVALID_TOKEN: new CErrorHandler({
        httpCode: 401,
        code: 1004,
        message: 'Your authorization token is invalid.'
    }),
    AUTH_FAILED: new CErrorHandler({
        httpCode: 401,
        code: 1004,
        message: 'Your authorization is invalid.'
    }),
    BAD_REQUEST: new CErrorHandler({
        httpCode: 400,
        code: 1006,
        message: 'Bad request.'
    }),
    UNIQUE_CONSTRAINT_ERROR: new CErrorHandler({
        httpCode: 400,
        code: 1015,
        message: 'Unique constraint error.'
    }),
    WRONG_VERSION_TOKEN: new CErrorHandler({
        httpCode: 403,
        code: 1016,
        message: 'Your version token is wrong.'
    }),
    INTERNAL_WRONG_VERSION: new CErrorHandler({
        httpCode: 500,
        code: 1017,
        message: 'Internal server error.'
    }),
    INVALID_VERSION_TOKEN: new CErrorHandler({
        httpCode: 400,
        code: 1018,
        message: 'Invalid token code.'
    }),
    OUT_OF_DATE: new CErrorHandler({
        httpCode: 403,
        code: 1019,
        message: 'Your version is out of date.'
    }),
    VERSION_INTERNAL_ERROR: new CErrorHandler({
        httpCode: 500,
        code: 1020,
        message: 'Something went wrong in processing version.'
    })
}

export = errors
