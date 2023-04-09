import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import { hashPassword } from './auth/password'

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
    res.send('hello, World!')
    console.log(hashPassword('yoo'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})