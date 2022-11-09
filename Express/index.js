import * as dotenv from "dotenv";
dotenv.config();
import Express from "express";
import helmet from "helmet";

const app = Express();

app.use(helmet());

app.get("/", (req, res) => {
  debugger;
  res.json({
    status: "ok",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
