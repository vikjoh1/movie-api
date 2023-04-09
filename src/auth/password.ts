import bcrypt from 'bcrypt'

export async function hashPassword(password: string | Buffer): Promise<string> {
    
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash

}