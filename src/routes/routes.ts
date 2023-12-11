import { Router } from "express"
import { getMovie, setFavoriteMovie } from '../controllers/movie.controller'
import { verifyToken } from "../middlewares/verifyToken"
import { signup, signin, signout, getUser } from "../controllers/auth.controller"

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/getUser', verifyToken, getUser)
router.get('/search/:title', verifyToken, getMovie)
router.post('/save', verifyToken, setFavoriteMovie)

export default router