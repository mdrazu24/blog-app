import {scrypt} from 'crypto' // We can use bcrypt js instead of crypto.
import {promisify} from 'util'


const scryptAsync = promisify(scrypt) //promisify is a function that takes a function and returns a promise version of that function. (scryp does not work with await keyword. That's why I'm using promisify.)

export class Password {
    static async toHash(password: string, salt : string) : Promise<string> {
        // const salt = randomBytes(8).toString('hex') 
        const hashPass = await scryptAsync(password, salt, 64) as Buffer
        return hashPass.toString('hex')

    }


    static async compare(password: string, hash: string, salt : string) : Promise<boolean> {
        const hashPass = await scryptAsync(password, salt, 64) as Buffer
        return hashPass.toString("hex") === hash
    }

}