import { log } from "console"
import { getMovieByTitle, addMovieToFavorites } from "../api/movie.api"
import { Request, Response } from "express"
import Movie, { IMovie, FavoriteMovies } from "../models/movie.model"


export const getMovie = async (req: Request, res: Response) => {
  const title = String(req.params.title)

  try {
    const movieData = await getMovieByTitle(title)
    
    res.json(movieData)
  } catch (error) {
    log(error)
    res.status(500).send(error)
  }
}

export const setFavoriteMovie = async (req: Request, res: Response) => {
  const imdbID = String(req.query.imdbID)
  
  try {
    const movieData = await addMovieToFavorites(imdbID)
    // save to FavoriteMovies
    const favoriteMovies = new FavoriteMovies({
      userId: "1",
      movie: movieData
    })
    await favoriteMovies.save()
    res.json(movieData)
  } catch (error) {
    log(error)
    res.status(500).send(error)
  }
}
