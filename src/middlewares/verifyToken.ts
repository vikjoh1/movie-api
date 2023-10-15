import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET! // Forced check, fix later.

interface ITokenPayload extends JwtPayload {
  userId: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // todo
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided.' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload
    req.body.userId = decoded.userId
    next()
  }
  catch (error) {
    return res.status(401).json({ error: 'Invalid token.' })
  }
}