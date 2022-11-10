import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import path from "path";

const app = express();
const apiRouter = express.Router();
const publicFolder = path.join(".", "dist");

app.use(helmet());

app.use(express.static(publicFolder));
// app.get("/", express.static(publicFolder));

app.use("/api", apiRouter);

apiRouter.get("/", (req, res) => {
  debugger;
  res.json({
    status: "ok",
  });
});

// app.use((req, res) => {
//   res.status(404);
// });

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
