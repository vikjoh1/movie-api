import { log } from "console"
import { getMovieByTitle } from "../api/movie.api"
import { Request, Response } from "express"
import Movie, { IMovie, FavoriteMovies } from "../models/movie.model"
import * as movieRepo from '../repositories/movie.repo'


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
    const isMovieInFavorites = await movieRepo.isFavoriteMovie(userId, movieData.imdbID)
    if (isMovieInFavorites) {
      return res.status(400).json({ error: 'Movie already in favorites.' })
    }
    await movieRepo.addFavoriteMovie(userId, movieData)
    return res.json({ message: 'Movie added to favorites.', movieData: movieData })
  } catch (error) {
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
