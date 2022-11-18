import JSONdb from "simple-json-db";
import path from "path";
import crypto from "crypto";

const db = new JSONdb(path.join(".", "db", "databaseMovies.json"));

export const getAllMovies = () => {
  return db.get("movies");
};

export const addMovie = (movie) => {
  //input validation
  const newMovie = {
    id: crypto.randomUUID(),
    name: typeof movie.name === "string" ? movie.name : "",
    score: typeof movie.score === "number" ? movie.score : 1,
  };
  const movies = db.get("movies");
  movies.push(newMovie);
  db.set("movies", movies);
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
