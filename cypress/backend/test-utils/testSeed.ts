import mongoDbClient from "../services/mongoDbClient.js";
import { addMovie } from "../services/movies.js";
import { registerUser } from "../services/users.js";

export const seed = async () => {
  try {
    await mongoDbClient.connect();
    const userCollectionExists = await mongoDbClient
      .db(process.env.COLLECTION)
      .listCollections({ name: "users" })
      .next();
    if (userCollectionExists) {
      await mongoDbClient.db(process.env.COLLECTION).collection("users").drop();
    }
    const user = await registerUser({
      username: "test@test.com",
      pass: "1A@qwertyuiop",
    });
    await mongoDbClient.connect();
    const moviesCollectionExists = await mongoDbClient
      .db(process.env.COLLECTION)
      .listCollections({ name: "movies" })
      .next();
    if (moviesCollectionExists) {
      await mongoDbClient.connect();
      await mongoDbClient
        .db(process.env.COLLECTION)
        .collection("movies")
        .drop();
    }
    await addMovie(
      {
        id: "1",
        name: "Star Wars",
        score: 5,
        createdBy: "",
      },
      user.id
    );
    await addMovie(
      {
        id: "2",
        name: "Jurassic Park",
        score: 3,
        createdBy: "",
      },
      user.id
    );
  } catch (error) {
    console.log(error);
  }
};
