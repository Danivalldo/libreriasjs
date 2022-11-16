import express from "express";
import {
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../../services/database.js";

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

apiRouter.post("/", (req, res) => {
  const newMovie = req.body;
  addMovie(newMovie);
  res.sendStatus(200);
});

apiRouter.delete("/:movieId", (req, res) => {
  deleteMovie(Number(req.params.movieId));
  res.sendStatus(200);
});

apiRouter.put("/:movieId", (req, res) => {
  updateMovie(Number(req.params.movieId), req.body);
  res.sendStatus(200);
});
