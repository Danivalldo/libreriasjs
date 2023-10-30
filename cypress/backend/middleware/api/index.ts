import express from "express";
import {
  getMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../../services/movies.js";

export const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

apiRouter.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies(req.userId);
    res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

apiRouter.post("/", async (req, res, next) => {
  try {
    const newMovie = req.body;
    const createdMovie = await addMovie(newMovie, req.userId);
    res.status(200).json({ status: "ok", response: createdMovie });
  } catch (error) {
    return next(error);
  }
});

apiRouter.delete("/:movieId", async (req, res, next) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId, req.userId);
    res.status(200).json({ status: "ok", response: deletedMovie });
  } catch (error) {
    return next(error);
  }
});

apiRouter.put("/:movieId", async (req, res, next) => {
  try {
    const updatedMovie = await updateMovie(
      req.params.movieId,
      req.body,
      req.userId
    );
    res.status(200).json({ status: "ok", response: updatedMovie });
  } catch (error) {
    return next(error);
  }
});
