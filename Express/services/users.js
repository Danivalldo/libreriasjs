import JSONdb from "simple-json-db";
import path from "path";
import bcrypt from "bcrypt";

const db = new JSONdb(path.join(".", "db", "databaseUsers.json"));

export const login = (username, pass) => {
  const users = db.get("users");
  return users.find((user) => user);
};
