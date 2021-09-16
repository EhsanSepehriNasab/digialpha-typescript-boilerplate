import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

var privateKey = fs.readFileSync(process.cwd() + '/private.key', 'utf8');

export async function getToken(username: string, password: string): Promise<string> {
    const result:string = await jwt.sign({ username, password }, privateKey, {})
    return result
}

export function checkToken(token: string): boolean {
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        try{
        const tokenObj: any = jwt.verify(token, privateKey);
        if (!tokenObj) return false;
        return true;
        } catch (e) {
            return false;
        }
    } else {
        return false
    }
}
