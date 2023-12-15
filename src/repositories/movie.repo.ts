import { FavoriteMovies } from "../models/movie.model"

export const addFavoriteMovie = async (userId: string, movieData: any) => {
  let favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
  
  if (!favoriteMovies) {
    favoriteMovies = new FavoriteMovies({
      userId: userId,
      movies: []
    })
  }

  favoriteMovies.movies.push(movieData)
  await favoriteMovies.save()
}

export const isFavoriteMovie = async (userId: string, imdbID: string) => {
  const favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
  return favoriteMovies?.movies.some(movie => movie.imdbID === imdbID)
}

export const deleteFavoriteMovie = async (userId: string, imdbID: string) => {
  let favoriteMovies = await FavoriteMovies.findOne({ userId: userId })
  
  if (!favoriteMovies) {
    return
  }

  const movieIndex = favoriteMovies.movies.findIndex(movie => movie.imdbID === imdbID)
  
  if (movieIndex === -1) {
    return
  }
  
  favoriteMovies.movies.splice(movieIndex, 1)
  await favoriteMovies.save()
}