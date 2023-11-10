import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";
import type { Movie as MovieType, UpdateMovie } from "../types/custom.js";
import Movie from "../models/Movie.js";

const schemaNewMovie = object({
  id: string().uuid().required(),
  name: string().max(50).required(),
  score: number().min(1).max(5).required(),
  poster: string(),
  createdBy: string().uuid().required(),
})
  .noUnknown(true)
  .required()
  .strict();

export const getMovies = async (userId: string) => {
  const movies = await Movie.find({ createdBy: userId }).lean();
  return movies;
};

export const addMovie = async (movie: MovieType, userId: string) => {
  if (!movie) {
    throw new Error("Movie not provided");
  }
  const newMovie = {
    ...movie,
    id: crypto.randomUUID(),
    name: sanitizeHtml(movie.name, { allowedTags: [] }),
    poster: sanitizeHtml(movie.name, { allowedTags: [] }),
    createdBy: userId,
  };
  await schemaNewMovie.validate(newMovie);
  const createdMovie = new Movie(newMovie);
  await createdMovie.save();
};

export const deleteMovie = async (id: string, userId: string) => {
  await Movie.deleteOne({ id, createdBy: userId });
};

export const updateMovie = async (
  id: string,
  newContent: UpdateMovie,
  userId: string
) => {
  const updatedMovie = await Movie.updateOne(
    { id, createdBy: userId },
    newContent
  ).lean();
  return updatedMovie;
};
