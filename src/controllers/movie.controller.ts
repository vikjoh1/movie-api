import { log } from "console"
import { getMovieByTitle } from "../api/movie.api"
import { Request, Response } from "express"
import Movie, { IMovie, FavoriteMovies } from "../models/movie.model"


export const getMovie = async (req: Request, res: Response) => {
  const title = String(req.params.title)
  try {
    const movieData = await getMovieByTitle(title)
    return res.json(movieData)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
}

export const setFavoriteMovie = async (req: Request, res: Response) => {
  const Title = String(req.body.Title)
  const userId = req.user?.userId
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const movieData = await getMovieByTitle(Title)
    let favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
    if (!favoriteMovies) {
      favoriteMovies = new FavoriteMovies({
        userId: userId,
        movies: []
      })
    }
    const isMovieInFavorites = favoriteMovies.movies.some(movie => movie.imdbID === movieData.imdbID)
    if (isMovieInFavorites) {
      return res.status(400).json({ error: 'Movie already in favorites.' })
    }
    favoriteMovies.movies.push(movieData)
    await favoriteMovies.save()
    return res.json({ message: 'Movie added to favorites.', movieData: movieData })
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
}

export const deleteFavoriteMovie = async (req: Request, res: Response) => {
  const imdbID = String(req.body.imdbID)
  const userId = req.user?.userId
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    let favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
    log(favoriteMovies)
    if (!favoriteMovies) {
      return res.status(404).json({ error: 'No favorite movies found.' })
    }
    const movieIndex = favoriteMovies.movies.findIndex(movie => movie.imdbID === imdbID)
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found in favorites.' })
    }
    favoriteMovies.movies.splice(movieIndex, 1)
    await favoriteMovies.save()
    return res.json({ message: 'Movie deleted from favorites.' })
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
}

export const myFavoriteMovies = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
    if (!favoriteMovies) {
      return res.status(404).json({ error: 'No favorite movies found.' })
    }
    return res.json(favoriteMovies)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
}

export const saveMovie = async (req: Request, res: Response) => {
  const movie = req.body as IMovie

  try {
    const movieData = new Movie(movie)
    await movieData.save()
    return res.json(movieData)
  } catch (error) {
    log(error)
    return res.status(500).send(error)
  }
}
