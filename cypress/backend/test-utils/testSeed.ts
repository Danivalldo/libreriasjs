import mongoDbClient from "../services/mongoDbClient.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { User } from "../types/custom.js";

export const seed = async () => {
  await mongoDbClient.connect();
  await mongoDbClient.db(process.env.COLLECTION).collection("users").drop();
  const userId = crypto.randomUUID();
  const hash: string = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(new Error("There was an error registering"));
      }
      bcrypt.hash("1A@qwertyuiop", salt, (err, hash) => {
        if (err || !hash) {
          return reject(new Error("There was an error registering"));
        }
        resolve(hash);
      });
    });
  });
  const newUser: User = {
    id: userId,
    username: "test@test.com",
    pass: hash,
  };
  await mongoDbClient
    .db(process.env.COLLECTION)
    .collection("users")
    .insertOne(newUser);
};
