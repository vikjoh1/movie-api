import mongoose, { Document, Schema } from "mongoose"

export interface IMovie extends Document {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: [
    {
      Source: string,
      Value: string
    }
  ],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type: string,
  Dvd: string,
  BoxOffice: string,
  Production: string,
  Website: string,
  Response: string
}

export interface IFavoriteMovies extends Document {
  userId: string,
  movies: IMovie[]
}



const MovieSchema: Schema = new Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Rated: { type: String, required: true },
  Released: { type: String, required: true },
  Runtime: { type: String, required: true },
  Genre: { type: String, required: true },
  Director: { type: String, required: true },
  Writer: { type: String, required: true },
  Actors: { type: String, required: true },
  Plot: { type: String, required: true },
  Language: { type: String, required: true },
  Country: { type: String, required: true },
  Awards: { type: String, required: true },
  Poster: { type: String, required: true },
  Ratings: [
    {
      Source: { type: String, required: true },
      Value: { type: String, required: true }
    }
  ],
  Metascore: { type: String, required: true },
  imdbRating: { type: String, required: true },
  imdbVotes: { type: String, required: true },
  imdbID: { type: String, required: true },
  Type: { type: String, required: true },
  Dvd: { type: String, required: false },
  BoxOffice: { type: String, required: true },
  Production: { type: String, required: false },
  Website: { type: String, required: false },
  Response: { type: String, required: true }
})

const FavoriteMoviesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  movies: [{ type: MovieSchema, required: true }]
})

export default mongoose.model<IMovie>('Movie', MovieSchema)
export const FavoriteMovies = mongoose.model<IFavoriteMovies>('FavoriteMovies', FavoriteMoviesSchema)










