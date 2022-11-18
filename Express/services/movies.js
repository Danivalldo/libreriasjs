import JSONdb from "simple-json-db";
import path from "path";
import crypto from "crypto";
import { string, number, object } from "yup";
import sanitizeHtml from "sanitize-html";

const db = new JSONdb(path.join(".", "db", "databaseMovies.json"));
const schema = object({
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
  try {
    await schema.validate(newMovie);
  } catch (err) {
    return err;
  }
  const movies = db.get("movies");
  movies.push(newMovie);
  db.set("movies", movies);
  return;
};

export const deleteMovie = (id) => {
  const movies = db.get("movies");
  db.set(
    "movies",
    movies.filter((movie) => movie.id !== id)
  );
};

export const updateMovie = (id, newContent) => {
  const movies = db.get("movies");
  db.set(
    "movies",
    movies.map((movie) => {
      if (movie.id !== id) {
        return movie;
      }
      return {
        ...movie,
        ...newContent,
      };
    })
  );
};
