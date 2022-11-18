import express from "express";
import {
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../../services/movies.js";

export const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  if (!req.isAuth) {
    return res.sendStatus(401);
  }
  next();
});

apiRouter.get("/", (req, res) => {
  res.json(getAllMovies());
});

apiRouter.post("/", async (req, res) => {
  const newMovie = req.body;
  await addMovie(newMovie);
  res.sendStatus(200);
});

apiRouter.delete("/:movieId", (req, res) => {
  deleteMovie(req.params.movieId);
  res.sendStatus(200);
});

apiRouter.put("/:movieId", (req, res) => {
  updateMovie(req.params.movieId, req.body);
  res.sendStatus(200);
});
