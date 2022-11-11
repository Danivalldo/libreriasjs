import express from "express";

export const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  if (!req.isAuth) {
    return next(new Error("User unathorized!"));
  }
  next();
});

apiRouter.get("/", (req, res) => {
  res.json({
    status: "ok",
    isAuth: req.isAuth,
  });
});
