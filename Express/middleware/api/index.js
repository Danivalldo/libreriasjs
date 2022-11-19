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
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

apiRouter.get("/", (req, res) => {
  res.status(200).json(getAllMovies());
});

apiRouter.post("/", async (req, res, next) => {
  const newMovie = req.body;
  const error = await addMovie(newMovie);
  if (error) {
    return next(error);
  }
  res.sendStatus(200);
});

apiRouter.delete("/:movieId", (req, res, next) => {
  const error = deleteMovie(req.params.movieId);
  if (error) {
    return next(error);
  }
  res.sendStatus(200);
});

apiRouter.put("/:movieId", async (req, res, next) => {
  const error = await updateMovie(req.params.movieId, req.body);
  if (error) {
    return next(error);
  }
  res.sendStatus(200);
});
