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

export const registerUser = (user) => {
	const users = db.get("users");
	users.push(user);
	db.set("users", users);
};
