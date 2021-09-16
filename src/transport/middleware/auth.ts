import {checkToken} from '../../util/jwt/index'
import error from '../../util/error/errors'
export default async function verifyAuth(req: any, res: any,next:any): Promise<any> {
    if(!checkToken(req.headers.authorization)) {
        res.status(401).send(error.INVALID_TOKEN)
    }
    next()
}