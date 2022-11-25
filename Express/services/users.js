import mongoDbClient from "./mongoDbClient.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { string, object } from "yup";

const schemaUser = object({
  id: string().uuid().required(),
  username: string().email().required(),
  pass: string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required(),
})
  .noUnknown(true)
  .required()
  .strict();

const getUserByUsername = async (username) => {
  await mongoDbClient.connect();
  const user = await mongoDbClient
    .db("my_movies")
    .collection("users")
    .findOne({ username });
  mongoDbClient.close();
  return user;
};

export const validateLogin = async (username, pass) => {
  const user = getUserByUsername(username);
  if (!user) {
    throw new Error("This user does not exist");
  }
  await new Promise((resolve, reject) => {
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (err || !result) {
        return reject(new Error("Bad credentials"));
      }
      resolve();
    });
  });
  return user;
};

export const registerUser = async ({ username, pass }) => {
  const user = getUserByUsername(username);
  if (user) {
    throw new Error("This username is taken");
  }
  const userId = crypto.randomUUID();
  await schemaUser.validate({ username, pass, id: userId });
  const hash = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(new Error("There was an error registering"));
      }
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err || !hash) {
          return reject(new Error("There was an error registering"));
        }
        resolve(hash);
      });
    });
  });
  const users = db.get("users");
  users.push({
    id: userId,
    username,
    pass: hash,
  });
  db.set("users", users);
};
