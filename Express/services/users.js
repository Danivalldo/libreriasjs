import JSONdb from "simple-json-db";
import path from "path";

const db = new JSONdb(path.join(".", "db", "databaseUsers.json"));

export const getUserByUsername = (username, pass) => {
	const users = db.get("users");
	return users.find((user) => user.username === username);
};
