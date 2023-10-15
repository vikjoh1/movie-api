import { Router } from "express"
import { getMovie } from '../controllers/movie.controller'
import { verifyToken } from "../middlewares/verifyToken"
import { signup, signin, signout } from "../controllers/auth.controller"

const router = Router()

router.get('/search/:title', verifyToken, getMovie)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)

export default router