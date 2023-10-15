import bcrypt from 'bcrypt'

export function hashPassword(password: string | Buffer): string {
    try {
        const saltRounds: number = 10
        const salt: string = bcrypt.genSaltSync(saltRounds)
        const hash: string = bcrypt.hashSync(password, salt)
        return hash
    } catch (error) {
        console.error('Error hashing password:', error)
        throw error
    } 
}

export function compare(plainPassword: string | Buffer, hashedPassword: string): boolean {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  } catch (error) {
    console.error('Error comparing passwords:', error)
    throw error
  }
}