import JSONdb from "simple-json-db";
import bcrypt from "bcrypt";
import { string, object } from "yup";
import path from "path";

const db = new JSONdb(path.join(".", "db", "databaseUsers.json"));
const schemaUser = object({
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

const getUserByUsername = (username) => {
  const users = db.get("users");
  return users.find((user) => user.username === username);
};

export const validateLogin = async ({ username, pass }) => {
  const user = getUserByUsername(username);
  if (!user) {
    throw new Error("This user does not exist");
  }
  await new Promise((resolve, reject) => {
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (err || !result) {
        debugger;
        return reject(new Error("Bad credentials"));
      }
      resolve();
    });
  });
};

export const registerUser = async ({ username, pass }) => {
  const user = getUserByUsername(username);
  if (user) {
    throw new Error("This username is taken");
  }
  await schemaUser.validate({ username, pass });
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
    username,
    pass: hash,
  });
  db.set("users", users);
};
