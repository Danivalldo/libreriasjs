import express from "express";
import jwt from "jsonwebtoken";
import { registerUser, validateLogin } from "../../services/users.js";

export const signRouter = express.Router();

signRouter.post("/login", async (req, res) => {
  try {
    if (typeof req.body !== "object") {
      throw new Error("Wrong credentials");
    }
    const { username, pass } = req.body;
    const user = await validateLogin(username, pass);
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "30min",
    });
    res.status(200).json({
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

signRouter.post("/register", async (req, res, next) => {
  try {
    if (typeof req.body !== "object") {
      throw new Error("Wrong credentials");
    }
    const { username, pass } = req.body;
    await registerUser({ username, pass });
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});
