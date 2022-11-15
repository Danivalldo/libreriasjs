import express from "express";
import { getAllMovies, deleteMovie } from "../../services/database.js";

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

apiRouter.delete("/:movieId", (req, res) => {
  deleteMovie(Number(req.params.movieId));
  res.sendStatus(200);
});
