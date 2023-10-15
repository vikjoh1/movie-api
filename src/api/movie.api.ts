import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'

export const getMovieByTitle = async (title: string) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw(error)
  }
}

export const addMovieToFavorites = async (imdbID: string) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${imdbID}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw(error)
  }
}