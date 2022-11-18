import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByUsername } from "../../services/users.js";

export const isAuthMiddleware = async (req, res, next) => {
	req.isAuth = false;
	const token = req.get("Authorization");
	if (!token) {
		return next();
	}
	let decodedToken = undefined;
	try {
		decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
	} catch (err) {
		return next();
	}
	if (!decodedToken) {
		return next();
	}
	req.isAuth = true;
	next();
};

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
