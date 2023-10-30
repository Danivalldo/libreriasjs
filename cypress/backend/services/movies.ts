import mongoDbClient from "./mongoDbClient.js";
import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";
import type { Movie, UpdateMovie } from "../types/custom.js";

const schemaNewMovie = object({
  id: string().uuid().required(),
  name: string().max(50).required(),
  score: number().min(1).max(5).required(),
  createdBy: string().uuid().required(),
})
  .noUnknown(true)
  .required()
  .strict();

export const getMovies = async (userId: string | boolean) => {
  await mongoDbClient.connect();
  const moviesPointer = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .find({ createdBy: userId });
  const movies = await moviesPointer.toArray();
  mongoDbClient.close();
  return movies;
};

export const addMovie = async (movie: Movie, userId: string | boolean) => {
  if (!movie) {
    throw new Error("Movie not provided");
  }
  const newMovie = {
    ...movie,
    id: crypto.randomUUID(),
    name: sanitizeHtml(movie.name, { allowedTags: [] }),
    createdBy: userId,
  };
  await schemaNewMovie.validate(newMovie);
  await mongoDbClient.connect();
  const createdMovie = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .insertOne(newMovie);
  mongoDbClient.close();
  return createdMovie;
};

export const deleteMovie = async (id: string, userId: string | boolean) => {
  await mongoDbClient.connect();
  const result = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .deleteOne({ id, createdBy: userId });
  mongoDbClient.close();
  return result;
};

export const updateMovie = async (
  id: string,
  newContent: UpdateMovie,
  userId: string | boolean
) => {
  await mongoDbClient.connect();
  const foundMovie = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .findOne({ id, createdBy: userId });
  if (!foundMovie) {
    throw new Error("This movie does not exists");
  }
  const updatedMovie = {
    score: foundMovie.score,
    createdBy: foundMovie.createdBy,
    ...newContent,
    id,
    name: newContent.name
      ? sanitizeHtml(newContent.name, { allowedTags: [] })
      : foundMovie.name,
  };
  await schemaNewMovie.validate(updatedMovie);
  const result = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .updateOne(
      { id, createdBy: userId },
      { $set: updatedMovie },
      { upsert: true }
    );
  mongoDbClient.close();
  return result;
};
