import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import type { Request, Response, NextFunction } from "express";
import { apiRouter } from "./middleware/api/index.js";
import { isAuthMiddleware } from "./middleware/isAuth/index.js";
import { signRouter } from "./middleware/signin/index.js";
import path from "path";

const app = express();
const publicFolder = path.join(".", "clients", "vanilla-js", "dist");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(isAuthMiddleware);
app.use(signRouter);
app.use(express.static(publicFolder));

app.get("/test", (req, res, next) => {
  res.json({ status: "ok" });
});

app.post("/test", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ error: error.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}/`);
  console.log(
    `THIS BACKEND INSTANCE WILL HIT THE DB: ${process.env.COLLECTION}`
  );
});
