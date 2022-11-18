import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByUsername, registerUser } from "../../services/users.js";

export const login = async (req, res, next) => {
	const { username, pass } = req.body;

	const user = getUserByUsername(username);

	if (!user) {
		return res.sendStatus(400);
	}

	bcrypt.compare(pass, user.pass, (err, result) => {
		console.log(result, err);
		if (err || !result) {
			return res.sendStatus(400);
		}

		const token = jwt.sign({ username }, process.env.SECRET_TOKEN, {
			expiresIn: "30min",
		});

		res.json({
			token,
		});
	});
};

export const register = async (req, res, next) => {
	const { username, pass } = req.body;
	const user = getUserByUsername(username);

	if (user) {
		return res.sendStatus(400);
	}

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(pass, salt, (err, hash) => {
			if (err || !hash) {
				return res.sendStatus(400);
			}
			registerUser({
				username,
				pass: hash,
			});
			return res.sendStatus(200);
		});
	});
};
