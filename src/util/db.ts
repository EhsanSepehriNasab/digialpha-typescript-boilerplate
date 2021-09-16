import errors from './error/errors'

type dbInput = { [key: string]: bigint | string | number | boolean | null }

export function validateNotNullKeys(input: dbInput): dbInput {
    const result: dbInput = {}
    let notEmptyObject = false
    for (const property in input) {
        if (input[property] != null) {
            result[property] = input[property]
            notEmptyObject = true
        }
    }
    if (!notEmptyObject) throw errors.BAD_REQUEST
    return result
}
