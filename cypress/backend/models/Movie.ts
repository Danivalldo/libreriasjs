import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  name: String,
  score: Number,
  poster: String,
});

const Movie = model("Movie", movieSchema);

export default Movie;
