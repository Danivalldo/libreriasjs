import bcrypt from "bcrypt";
import crypto from "crypto";
import { string, object } from "yup";
import type { User as UserType } from "../types/custom.js";
import User from "../models/User.js";

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

const getUserByUsername = async (username: string) => {
  const user: UserType | null = await User.findOne({ username }).lean();
  return user;
};

export const validateLogin = async (username: string, pass: string) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("This user does not exists");
  }
  await new Promise<void>((resolve, reject) => {
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (err || !result) {
        return reject(new Error("Bad credentials"));
      }
      resolve();
    });
  });
  return user;
};

export const registerUser = async ({
  username,
  pass,
}: {
  username: string;
  pass: string;
}) => {
  const user = await getUserByUsername(username);
  if (user) {
    throw new Error("This username is taken");
  }
  const userId = crypto.randomUUID();
  await schemaUser.validate({ username, pass, id: userId });
  const hash: string = await new Promise((resolve, reject) => {
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
  const newUser: UserType = {
    id: userId,
    username,
    pass: hash,
  };
  const createdUser = new User(newUser);
  await createdUser.save();
  return newUser;
};
