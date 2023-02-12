import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/", (req, res, next) => {
  res.status(200).json({
    status: "ok",
  });
});

apiRouter.post("/", (req, res) => {
  res.status(200).json({
    ...req.body,
  });
});
