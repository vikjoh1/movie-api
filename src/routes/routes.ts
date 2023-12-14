import { Router } from "express"
import { deleteFavoriteMovie, getMovie, myFavoriteMovies, setFavoriteMovie } from '../controllers/movie.controller'
import { verifyToken } from "../middlewares/verifyToken"
import { signup, signin, signout, getUser } from "../controllers/auth.controller"

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.get('/getUser', verifyToken, getUser)
router.get('/search/:title', verifyToken, getMovie)
router.post('/save', verifyToken, setFavoriteMovie)
router.get('/favorites', verifyToken, myFavoriteMovies)
router.delete('/delete', verifyToken, deleteFavoriteMovie)

export default router