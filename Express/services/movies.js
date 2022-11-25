import mongoDbClient from "./mongoDbClient.js";
import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";
const schemaNewMovie = object({
  id: string().uuid().required(),
  name: string().max(50).required(),
  score: number().min(1).max(5).required(),
  createdBy: string().uuid().required(),
})
  .noUnknown(true)
  .required()
  .strict();

export const getMovies = async (userId) => {
  await mongoDbClient.connect();
  const moviesPointer = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .find({ createdBy: userId });
  const movies = await moviesPointer.toArray();
  mongoDbClient.close();
  return movies;
};

export const addMovie = async (movie, userId) => {
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

export const deleteMovie = async (id, userId) => {
  await mongoDbClient.connect();
  const result = await mongoDbClient
    .db("my_movies")
    .collection("movies")
    .deleteOne({ id, createdBy: userId });
  mongoDbClient.close();
  return result;
};

export const updateMovie = async (id, newContent, userId) => {
  const movies = db.get("movies");
  const indexMovie = movies.findIndex((movie) => movie.id === id);
  if (indexMovie < 0) {
    throw new Error("This movie does not exists");
  }
  if (movies[indexMovie].createdBy !== userId) {
    throw new Error("You are not the creator");
  }
  const updatedMovie = {
    ...movies[indexMovie],
    ...newContent,
    name: newContent.name
      ? sanitizeHtml(newContent.name, { allowedTags: [] })
      : movies[indexMovie].name,
  };
  await schemaNewMovie.validate(updatedMovie);
  movies[indexMovie] = updatedMovie;
  db.set("movies", movies);
  return;
};
