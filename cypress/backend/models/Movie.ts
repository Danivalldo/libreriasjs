import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  id: String,
  name: String,
  score: Number,
  poster: String,
  createdBy: String,
});

const Movie = model("Movie", movieSchema);

export default Movie;
