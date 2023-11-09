import { addMovie } from "../services/movies.js";
import { registerUser } from "../services/users.js";
import Movie from "../models/Movie.js";
import { connect } from "mongoose";
import User from "../models/User.js";

export const seed = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE,
    });
    await Movie.collection.drop();
    await User.collection.drop();
    const user = await registerUser({
      username: "test@test.com",
      pass: "1A@qwertyuiop",
    });
    await addMovie(
      {
        id: "1",
        name: "Star Wars",
        score: 5,
        poster:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/250px-Star_Wars_Logo.svg.png",
        createdBy: "",
      },
      user.id
    );
    await addMovie(
      {
        id: "2",
        name: "Jurassic Park",
        score: 3,
        poster: "./jurassic_park.jpeg",
        createdBy: "",
      },
      user.id
    );
  } catch (err) {
    console.log(err);
  }
};
