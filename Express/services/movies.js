import mongoDbClient from "./mongoDbClient.js";
import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";

const db = new JSONdb(path.join(".", "db", "databaseMovies.json"));
const schemaNewMovie = object({
  id: string().uuid().required(),
  name: string().max(50).required(),
  score: number().min(1).max(5).required(),
  createdBy: string().uuid().required(),
})
  .noUnknown(true)
  .required()
  .strict();

export const getMovies = (userId) => {
  const movies = db.get("movies");
  return movies.filter((movie) => movie.createdBy === userId);
};

export const addMovie = async (movie, userId) => {
  const newMovie = {
    ...movie,
    id: crypto.randomUUID(),
    name: sanitizeHtml(movie.name, { allowedTags: [] }),
    createdBy: userId,
  };
  await schemaNewMovie.validate(newMovie);
  const movies = db.get("movies");
  movies.push(newMovie);
  db.set("movies", movies);
  return;
};

export const deleteMovie = (id, userId) => {
  const movies = db.get("movies");
  const indexMovie = movies.findIndex((movie) => movie.id === id);
  if (indexMovie < 0) {
    throw new Error("This movie does not exists");
  }
  if (movies[indexMovie].createdBy !== userId) {
    throw new Error("You are not the creator");
  }
  movies.splice(indexMovie, 1);
  db.set("movies", movies);
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
