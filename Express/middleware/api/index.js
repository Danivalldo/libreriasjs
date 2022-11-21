import express from "express";
import {
  getAllMovies,
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

apiRouter.get("/", (req, res) => {
  res.status(200).json(getAllMovies(req.username));
});

apiRouter.post("/", async (req, res, next) => {
  try {
    const newMovie = req.body;
    await addMovie(newMovie, req.username);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return next(error);
  }
});

apiRouter.delete("/:movieId", (req, res, next) => {
  try {
    deleteMovie(req.params.movieId, req.username);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return next(error);
  }
});

apiRouter.put("/:movieId", async (req, res, next) => {
  try {
    await updateMovie(req.params.movieId, req.body, req.username);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return next(error);
  }
});
