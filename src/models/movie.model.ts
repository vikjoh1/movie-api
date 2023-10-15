import mongoose, { Document, Schema } from "mongoose"

export interface IMovie extends Document {
  title: string,
  year: string,
  rated: string,
  released: string,
  runtime: string,
  genre: string,
  director: string,
  writer: string,
  actors: string,
  plot: string,
  language: string,
  country: string,
  awards: string,
  poster: string,
  ratings: [
    {
      source: string,
      value: string
    }
  ],
  metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  type: string,
  dvd: string,
  boxOffice: string,
  production: string,
  website: string,
  response: string
}

export interface IFavoriteMovies extends Document {
  userId: string,
  movie: IMovie
}



const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  rated: { type: String, required: true },
  released: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  actors: { type: String, required: true },
  plot: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  awards: { type: String, required: true },
  poster: { type: String, required: true },
  ratings: [
    {
      source: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  metascore: { type: String, required: true },
  imdbRating: { type: String, required: true },
  imdbVotes: { type: String, required: true },
  imdbID: { type: String, required: true },
  type: { type: String, required: true },
  dvd: { type: String, required: true },
  boxOffice: { type: String, required: true },
  production: { type: String, required: true },
  website: { type: String, required: true },
  response: { type: String, required: true }
})

const FavoriteMoviesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  movies: { type: [MovieSchema], required: true }
})

export default mongoose.model<IMovie>('Movie', MovieSchema)
export const FavoriteMovies = mongoose.model<IFavoriteMovies>('FavoriteMovies', FavoriteMoviesSchema)










