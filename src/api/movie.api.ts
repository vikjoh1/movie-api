import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const getMovieByTitle = async (title: string) => {
  if (!title) {
    throw new Error("No title provided.");
  }
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMovieById = async (imdbID: string) => {
  if (!imdbID) {
    throw new Error("No IMDB ID provided.");
  }
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${imdbID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchMovies = async (searchTerm: string) => {
  if (!searchTerm) {
    throw new Error("No search term provided.");
  }
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${encodedSearchTerm}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addMovieToFavorites = async (imdbID: string) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${imdbID}`
    );
    const movieData = response.data;
    if (!movieData || movieData.Response === "False") {
      throw new Error(movieData.Error || "Invalid response from OMDB API.");
    }
    return movieData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
