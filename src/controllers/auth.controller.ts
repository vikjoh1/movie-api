import * as dotenv from 'dotenv'
dotenv.config()
import User, { IUser } from "../models/user.model"
import { hashPassword, compare } from "../utils/password"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET! // Forced check, fix later.

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const userExists: IUser | null = await User.findOne({ username })

    if (userExists) {
      return res.status(400).json({ error: 'Username already taken.' })
    }

    const hashedPassword = hashPassword(password)
    const user = new User({
      username,
      password: hashedPassword
    })

    await user.save()

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(201).json({ message: 'User successfully created.', token })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' })
  }
}

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user: IUser | null = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password.' })
    }

    const isMatch = compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password.' })
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ message: 'Logged in successfully.', token })
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in.' })
  }
}

export const signout = async (req: Request, res: Response) => {
  // maybe not needed as a endpoint?
  res.status(200).json({ message: 'Logged out successfully.' })
}

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body
  try {
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: 'User deleted successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' })
  }
}


export const changePassword = async (req: Request, res: Response) => {
  const { userId, oldPassword, newPassword } = req.body
  try {
    const user: IUser | null = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ error: 'Invalid user.' })
    }

    const isMatch = compare(oldPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password.' })
    }

    const hashedPassword = hashPassword(newPassword)
    user.password = hashedPassword
    await user.save()

    res.status(200).json({ message: 'Password changed successfully.' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password.' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body
  try {
    const user: IUser | null = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ error: 'Invalid user.' })
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user.' })
  }
}