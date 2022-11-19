import express from "express";
import jwt from "jsonwebtoken";
import { registerUser, validateLogin } from "../../services/users.js";

export const signRouter = express.Router();

signRouter.post("/login", async (req, res) => {
  const { username, pass } = req.body;
  const error = await validateLogin({ username, pass });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const token = jwt.sign({ username }, process.env.SECRET_TOKEN, {
    expiresIn: "30min",
  });
  res.status(200).json({
    token,
  });
});

signRouter.post("/register", async (req, res, next) => {
  const { username, pass } = req.body;
  const error = await registerUser({ username, pass });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.sendStatus(200);
});
