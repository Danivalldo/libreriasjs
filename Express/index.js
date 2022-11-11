import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { apiRouter } from "./middleware/api/index.js";
import { isAuthMiddleware, login } from "./middleware/isAuth/index.js";
import path from "path";

const app = express();
const publicFolder = path.join(".", "dist");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", login);
app.use(isAuthMiddleware);

app.use(express.static(publicFolder));

app.get("/test", (req, res, next) => {
  debugger;
  res.json({ status: "ok" });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}/`);
});
