import express from "express";

export const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  debugger;
  res.json({
    status: "ok",
  });
});
