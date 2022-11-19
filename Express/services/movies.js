import JSONdb from "simple-json-db";
import path from "path";
import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";

const db = new JSONdb(path.join(".", "db", "databaseMovies.json"));
const schemaNewMovie = object({
  id: string().uuid().required(),
  name: string().required(),
  score: number().min(1).max(5).required(),
})
  .noUnknown(true)
  .required()
  .strict();

export const getAllMovies = () => {
  return db.get("movies");
};

export const addMovie = async (movie) => {
  const newMovie = {
    ...movie,
    id: crypto.randomUUID(),
    name: sanitizeHtml(movie.name, { allowedTags: [] }),
  };
  await schemaNewMovie.validate(newMovie);
  const movies = db.get("movies");
  movies.push(newMovie);
  db.set("movies", movies);
  return;
};

export const deleteMovie = (id) => {
  const movies = db.get("movies");
  const indexMovie = movies.findIndex((movie) => movie.id === id);
  if (indexMovie < 0) {
    throw new Error("This movie does not exists");
  }
  movies.splice(indexMovie, 1);
  db.set("movies", movies);
};

export const updateMovie = async (id, newContent) => {
  const movies = db.get("movies");
  const indexMovie = movies.findIndex((movie) => movie.id === id);
  if (indexMovie < 0) {
    throw new Error("This movie does not exists");
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
